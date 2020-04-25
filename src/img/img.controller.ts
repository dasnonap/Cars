import { Controller, Get, Res, Param } from '@nestjs/common';
import * as fs from 'fs-extra';

@Controller('img')
export class ImgController {

    @Get(':ad')
    findAdWithDesc(@Param('ad') ad: string, @Res() res){
        const id = ad.split("_");
        const dir = 'F:/ads/ad' + id[0] +'/photos';

        if( !fs.existsSync(dir) ){
            res.status(404);
        }
        else{
           res.sendFile( ad + '.jpg', { root: dir});
        }    
    }
}
