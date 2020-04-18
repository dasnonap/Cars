import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, Param, Res, Get, Body } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs-extra';
import { AdvertismentsModel } from 'src/DTO/advertisments.model';



@Controller('uploads')
export class UploadsController {

    @Post()
    @UseInterceptors(
        FileInterceptor('image',)
    )
    async getImage(@UploadedFile() file, ad: AdvertismentsModel){
        
        fs.move('./ads/photos/' + file.filename, this.createFilePath(1, ad));
    }

    @Post('multiple')
    @UseInterceptors(
        FilesInterceptor('image', 20)
    )
    async getAllImages(@UploadedFiles() files, @Body() ad: AdvertismentsModel){
        let count = 1;


        files.forEach(file => {
            fs.move('./ads/photos/' + file.filename, this.createFilePath(count, ad) );
            count++;
        });
    }

    @Get(':img')
    seeImage(@Param('img') image, @Res() res, @Body()ad: AdvertismentsModel){

        let rootDirAd = 'F:/ads/ad' + ad.id + '/photos/';
        let fileName = ad.id + '_' + image + '.jpg'

        return res.sendFile( fileName, { root: rootDirAd });
    }


    private createFilePath(counter: number, ad: AdvertismentsModel){
        this.createDir(ad);

        return 'F:/ads/ad' + ad.getID() + '/photos/' +  ad.getID() + '_' + counter + '.jpg';
    }

    private createDir(ad: AdvertismentsModel){
        if(!fs.existsSync('F:/ads/ad' + ad.getID() +'/photos',)){

            fs.mkdir('F:/ads/ad' + ad.getID(), (err)=>{
                if(err) throw err;
            } );
    
            fs.mkdir('F:/ads/ad' + ad.getID() +'/photos', (err)=>{
                if(err) throw err;
            } );
        }
    }
}
