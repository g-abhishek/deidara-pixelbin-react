import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import retry from "async-retry";

const DEFAULT_RETRY_OPTS = {
    retries: 3,
    backOffFactor: 2,
    minTimeout: 500,
};

function fetchImageWithRetry(url, cancelToken, retryOpts) {
    return retry(async (bail) => {
        try {
            const response = await axios.get(url, {
                withCredentials: false,
                responseType: "blob",
                cancelToken: cancelToken,
                validateStatus(status) {
                    return status === 200;
                },
            });
            return response;
        } catch (err) {
            // This will trigger a retry
            if (err.response && err.response.status === 202) {
                return Promise.reject(err);
            }
            // This would exit without any retries
            bail(err);
        }
    }, retryOpts);
}

const PixelBinImage = ({
    imgUrl,
    onLoad = () => {},
    onError = () => {},
    onExhausted = () => {},
    retryOpts = {},
    LoaderComponent,
    imgProps,
}) => {
    const imgRef = useRef();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        /**
         * If the component is unmounted before API call finishes, we use CancelToken to cancel the API call.
         * If in case the component unmounts just after the call is finished but any state updates haven't been made,
         * we use `unmounted` to prevent any state updates.
         */
        let unmounted = false;
        let source = axios.CancelToken.source();

        setIsLoading(true);

        /**
         * If image was fetched successfully, set it as the src.
         * If an error occurs & its status is 202, means we ran out of retries.
         * Any other error is a genuine error and needs to be propagated to the caller.
         * Note: `setIsLoading` is called before updating the src,
         * because img tag needs to be rendered for its ref to be accessed.
         */
        fetchImageWithRetry(imgUrl, source.token, { ...retryOpts, ...DEFAULT_RETRY_OPTS })
            .then((result) => {
                if (unmounted) return;

                setIsLoading(false);
                imgRef.current.src = URL.createObjectURL(result.data);
            })
            .catch((err) => {
                if (unmounted) return;

                if (err.response && err.response.status !== 202) {
                    onError(err);
                }
                setIsLoading(false);
                onExhausted();
            });

        return () => {
            unmounted = true;
            source.cancel("Cancelling in cleanup");
            // When component is unmounted remove blob from memory
            if (imgRef.current) URL.revokeObjectURL(imgRef.current.src);
        };
    }, []);

    if (isLoading && LoaderComponent) {
        return (
            <LoaderComponent />
        );
    } else {
        return (
            <img
                // For SSR
                src={typeof window === "undefined" && imgUrl}
                data-testid="pixelbin-image"
                {...imgProps}
                ref={imgRef}
                onLoad={onLoad}
            />
        );
    }
}

export default PixelBinImage
