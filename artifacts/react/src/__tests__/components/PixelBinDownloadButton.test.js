import React from "react";
import axios from "axios";
import fs from "fs";
import path from "path";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PixelBinDownloadButton } from "../../components";

jest.mock("axios");
afterEach(cleanup);

const url = "https://cdn.pixelbinx0.de/v2/cloudName/t.resize(h:200,w:200)/random.jpeg";

describe("PixelBin Image", () => {

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
        render(<PixelBinDownloadButton url={url}>Download</PixelBinDownloadButton>);

        expect(await screen.findByTestId("pixelbin-download-button")).toBeInTheDocument();
        expect(screen.getByText(/Download/)).toBeInTheDocument();
    });

    xit("should call onDownloadStart", async () => {
        const onDownloadStartMock = jest.fn();
        render(
            <PixelBinDownloadButton
                url={url}
                onDownloadStart={onDownloadStartMock}
            >
                Download
            </PixelBinDownloadButton>
        );

        const buttonElement = screen.getByTestId("pixelbin-download-button");
        expect(buttonElement).toBeInTheDocument();
        expect(screen.getByText(/Download/)).toBeInTheDocument();
        userEvent.click(screen.getByText(/Download/));
        waitFor(() => Promise.resolve, 0);

        expect(onDownloadStartMock).toHaveBeenCalled();
    })
});
