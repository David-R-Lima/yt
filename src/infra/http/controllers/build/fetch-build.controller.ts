// secure-download.controller.ts
import { Controller, Get, NotFoundException, Param, StreamableFile } from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';

@Controller('/build/:os/:filename')
export class FetchBuildController {
    @Get()
    async downloadBinary(
        @Param('os') os: 'linux' | 'win',
        @Param('filename') filename: string,
    )  {
        const filePath = join(process.cwd(), 'bin', os, filename);

        if (!existsSync(filePath)) {
            throw new NotFoundException();
        }


        const file = createReadStream(filePath);
        return new StreamableFile(file);
    }
}
