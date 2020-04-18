import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransTypeService } from './trans-type.service';
import { TransTypeModel } from 'src/DTO/transType.model';


@Controller('trans-type')
export class TransTypeController {
    constructor(private trasnService: TransTypeService){}
    
    @Get()
    getAll(){
        return this.trasnService.findAll();
    }

    @Post()
    insert(@Body()type: TransTypeModel){
        try{
            this.trasnService.insertOne(type);
        }
        catch(err){
            return 'Already exists';
        }
    }
}
