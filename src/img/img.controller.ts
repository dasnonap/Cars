import { Controller, Get, Res, Param } from '@nestjs/common';
import * as fs from 'fs-extra';

@Controller('img')
export class ImgController {

    @Get(':ad')
    findAdWithDesc(@Param('ad') ad: string, @Res() res){
        const id = ad.split("_");
        const dir = 'F:/ads/ad' + id[0] +'/photos';

        if( !fs.existsSync(dir) ){
            return res.status(404).send();
        }
        else{
           res.sendFile( ad + '.jpg', { root: dir});
        }    
    }
}
