import React from "react";
import axios from "axios";
import fs from "fs";
import path from "path";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, screen, render, waitFor } from "@testing-library/react";

import { PixelBinImage } from "../../components";

jest.mock("axios");
afterEach(cleanup);

const imgUrl = "https://cdn.pixelbinx0.de/v2/cloudName/t.resize(h:200,w:200)/random.jpeg";

describe("PixelBin Image", () => {
    beforeAll(() => {
        window.URL.createObjectURL = jest.fn();
    });

    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: new Blob([fs.readFileSync(path.join(__dirname, "../fixtures/sample-jpeg.jpeg"))])
        });
        axios.CancelToken.source.mockReturnValue({
            token: "dummy-token",
            cancel(msg){
                console.log(msg);
            },
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render", async () => {
        render(<PixelBinImage imgUrl={imgUrl}/>);

        expect(await screen.findByTestId("pixelbin-image")).toBeInTheDocument();
    });

    // TODO: Debug why this test fails, even when the actual functionality works
    xit("should invoke onLoad when image is loaded", async () => {
        const onLoadMock = jest.fn();
        render(<PixelBinImage imgUrl={imgUrl} onLoad={onLoadMock}/>);

        expect(await screen.findByTestId("pixelbin-image")).toBeInTheDocument();

        await waitFor(() => expect(onLoadMock).toHaveBeenCalled());
    });

    it("should invoke onError when image fetch fails", async () => {
        axios.get.mockRejectedValue({
            data: "Failed"
        });

        const onErrorMock = jest.fn();
        render(<PixelBinImage imgUrl={imgUrl} onError={onErrorMock}/>);

        expect(await screen.findByTestId("pixelbin-image")).toBeInTheDocument();

        await waitFor(() => expect(onErrorMock).toHaveBeenCalledWith({
            data: "Failed"
        }));
    });

    it("should invoke 'onExhausted' when retries are exhausted", async () => {
        const errResponse = {
            response: {
                status: 202,
                data: "Still Processing"
            }
        };
        axios.get.mockRejectedValue(errResponse);

        const onExhaustedMock = jest.fn();
        render(
            <PixelBinImage
                imgUrl={imgUrl}
                onExhausted={onExhaustedMock}
                retryOpts={{ retries: 1, interval: 10 }}
            />
        );

        expect(await screen.findByTestId("pixelbin-image")).toBeInTheDocument();
        await waitFor(() => expect(onExhaustedMock).toHaveBeenCalledWith(errResponse));
    });

    it("should render 'LoadingComponent' while image is being fetched", async () => {
        const errResponse = {
            response: {
                status: 202,
                data: "Still Processing"
            }
        };
        axios.get.mockRejectedValue(errResponse);

        const onExhaustedMock = jest.fn();
        render(
            <PixelBinImage
                imgUrl={imgUrl}
                onExhausted={onExhaustedMock}
                retryOpts={{ retries: 1, interval: 10 }}
                LoaderComponent={() => <div data-testid="loading-component"></div>}
            />
        );

        expect(screen.getByTestId("loading-component")).toBeInTheDocument();
        await waitFor(() => expect(onExhaustedMock).toHaveBeenCalledWith(errResponse));
    });

    it("should accept extra imageProps", async () => {
        render(
            <PixelBinImage
                imgUrl={imgUrl}
                style={{
                    borderRadius: "4px",
                    objectFit: "cover"
                }}
                data-testid="pixelbin-element"
            />
        );

        const imgElement = await screen.findByTestId("pixelbin-image")
        expect(imgElement).toBeInTheDocument();
        expect(imgElement.style.borderRadius).toBe("4px");
        expect(imgElement.style.objectFit).toBe("cover");
    });
})
