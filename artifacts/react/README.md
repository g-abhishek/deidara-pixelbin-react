# Pixelbin React Library

A React library to integrate PixelBin components in your frontend applications.

## Installation & Usage

You can install the library like this:
```
npm install  @pixelbin/react --save
```

And then use any of the components in your app:
```
import { PixelBinImage } from "@pixelbin/react"

const App = () => {
    // Any PixelBin Image URL
    const imgUrl = "https://cdn.pixelbin.io/v2/your-cloud-name/z-slug/erase.bg()~t.resize(h:100,w:100)/path/to/image.format"

    return (
        <PixelBinImage
            imgUrl={imgUrl}
            retryOpts={{
                retries: 2, interval: 100
            }}
        />
    )
}

export default App;
```

## Components

### &lt;PixelBinImage /&gt;
An `img` component to display PixelBin's transformed images. You just need to pass the image URL and the comment will handle the polling of lazy transformations internally.
#### Props
* `imgUrl` - URL for the transformed image.
* `onLoad` - A function to be called when the image is loaded. Will be invoked with the event object.
* `onError` - A function to be called when image fetching/loading fails. Will be invoked with the error object if image fetch fails, or else will be invoked with the event object if image loading fails.
* `onExhausted` - A function to be called, when all polling attempts have been exhausted. Will be invoked with the error object of the last attempt.
* `retryOpts` - Parameters for tweaking the retry logic. This object can have following attributes:
    * `retries` - No. of times URL should be polled <b>again</b>, if the initial call doesn't return the image. Defaults to `3`.
    * `backoffFactor` - Factor for exponential backoff. Defaults to `2`.
    * `interval` - The number of milliseconds to wait before starting the first retry. Defaults to `500`.
* `LoaderComponent` - A React component to be displayed while the image is being fetched.
* Note: Any extra props, other than the ones above, will be passed to the rendered `img` element.

