import { exec } from "child_process";
import { promisify } from "util";
import * as fs from "fs";
import * as path from "path";
import { Injectable } from "@nestjs/common";

const execAsync = promisify(exec);

interface DownloadResponse {
    fileUrl: string;
    artist?: string;
    duration?: number;
    thumbnail?: string;
}

@Injectable()
export class DownloadService {
    downloadFolder = path.resolve(__dirname, "../../../downloaded-songs");

    constructor() {
        if (!fs.existsSync(this.downloadFolder)) {
            fs.mkdirSync(this.downloadFolder, { recursive: true });
        }
    }

    async download(url: string, name: string): Promise<DownloadResponse> {
        const outputTemplate = path.join(this.downloadFolder, `${name}.%(ext)s`);
        const command = `yt-dlp -x --audio-format mp3 -o "${outputTemplate}" "${url}"`;

        // Extract metadata
        const metadataCmd = `yt-dlp -j "${url}"`;
        let metadata: any = {};
        try {
            const { stdout } = await execAsync(metadataCmd);
            metadata = JSON.parse(stdout);
        } catch (error) {
            console.error("Metadata fetch failed:", error);
        }

        // Download audio
        try {
            const { stdout, stderr } = await execAsync(command);
            console.log("Download complete:", stdout);
            if (stderr) console.error("Download stderr:", stderr);
        } catch (error) {
            console.error("Download failed:", error);
        }

        return {
            fileUrl: `/downloaded-songs/${name}.mp3`,
            artist: metadata.artist || metadata.uploader || null,
            duration: metadata.duration || null,
            thumbnail: metadata.thumbnail || null,
        };
    }



    isDownloaded(name: string): boolean {
        const filePath = path.join(this.downloadFolder, `${name}.mp3`);
        return fs.existsSync(filePath);
    }
}
