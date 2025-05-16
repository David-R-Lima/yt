import { exec } from "child_process";
import { promisify } from "util";
import * as fs from "fs";
import * as path from "path";
import { Injectable } from "@nestjs/common";

const execAsync = promisify(exec);

interface response {
    url: string
}

@Injectable()
export class DownloadService {
    downloadFolder = path.resolve(__dirname, "../../../downloaded-songs");

    constructor() {
        if (!fs.existsSync(this.downloadFolder)) {
            fs.mkdirSync(this.downloadFolder, { recursive: true });
        }
    }

    async download(url: string, name: string): Promise<response> {
        const outputTemplate = path.join(this.downloadFolder, `${name}.%(ext)s`);
        const command = `yt-dlp -x --audio-format mp3 -o "${outputTemplate}" "${url}"`;

        try {
            const { stdout, stderr } = await execAsync(command);
            console.log("Download complete:", stdout);
            if (stderr) console.error("Errors:", stderr);
        } catch (error) {
            console.error("Download failed:", error);
        }

        return { url: `/downloaded-songs/${name}.mp3` };
    }


    isDownloaded(name: string): boolean {
        const filePath = path.join(this.downloadFolder, `${name}.mp3`);
        return fs.existsSync(filePath);
    }
}
