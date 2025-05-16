import { Body, Controller, Post } from "@nestjs/common";
import { DownloadSongUseCase } from "src/domain/usecases/download-song";


@Controller("/download")
export class DownloadSongController {
    constructor(private readonly downloadSongUseCase: DownloadSongUseCase) {}

    @Post()
    async handle(@Body() body: {
        url: string;
        name: string
    }): Promise<void> {
        const {name, url} = body;
        try {
            await this.downloadSongUseCase.execute({
                url,
                name
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}