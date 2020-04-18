import { Controller, Get, Post, Body } from '@nestjs/common';
import { WheeldriveService } from './wheeldrive.service';
import { WheelDriveModel } from 'src/DTO/wheelDrive.model';

@Controller('wheeldrive')
export class WheeldriveController {
    constructor(private wheelService: WheeldriveService){}
    @Get()
    getAll(){
        return this.wheelService.findAll();
    }

    @Post()
    insertOne(@Body() wheel: WheelDriveModel){
        try{
            this.wheelService.insert(wheel);
        }
        catch(err){
            return 'Already exists';
        }
    }
}
