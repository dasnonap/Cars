import { Injectable } from '@nestjs/common';
import { AdvertismentsService } from 'src/entities/advertisments/advertisments.service';
import { CarsService } from 'src/entities/cars/cars.service';
import { SearchModel } from 'src/DTO/search.model';
import { Advertisments } from 'src/entities/advertisments/advertisments.entity';
import  fs from 'fs-extra';
@Injectable()
export class QueriesService {
    constructor(
        private ads: AdvertismentsService,
        private cars: CarsService 
        ){}

    getAds(){
        return this.ads.findAll();
    }

    getPhotos(ads: Advertisments[]){
        ads.forEach(ad => {
            var photoObj = {
                name: ad.adID,

            }
        });
    }
    private  getPhotosWithID(dir: string,id: number){
        var array = new Array(0);
        fs.readdir(dir, (error, files) => { 
            let totalFiles = files.length; 
            for(var i=0; i < files.length; i++){
                array.push();
            }

         });
    }

    async searchBy(search: SearchModel){
        var array = await this.ads.findAll();
        
        return this.getWithSearch(search, array);
    }
    private getWithSearch(seacrh: SearchModel, array: Advertisments[]){

        return this.getEngine(seacrh, array);
    }
    private getEngine(seacrh: SearchModel, array: Advertisments[]){
        if(seacrh.engine != "null"){
            return this.getTrans(seacrh,  array.filter(function(value, index, arr){
                return value.carID.engineID.type == seacrh.engine;
            }));
        }
        return this.getTrans(seacrh, array);
    }
    private getTrans(seacrh: SearchModel, array: Advertisments[]){
        if(seacrh.transmission != "null"){
            return this.getModel(seacrh, array.filter(function(value, index, arr){
                return value.carID.transID.type == seacrh.transmission;
            }))
        }
        return this.getModel(seacrh, array);
    }
    private getModel(seacrh: SearchModel, array: Advertisments[]){
        if(seacrh.model != "null"){
            return this.getManSearch( seacrh, array.filter(function(value, index, arr){
                return value.carID.modelID.modelName == seacrh.model;
            }))
        }
        return this.getManSearch(seacrh, array);
    }
    private getManSearch(seacrh: SearchModel, array: Advertisments[]){
        if(seacrh.manufacturer != "null"){
            return this.getCar(seacrh, array.filter(function(value, index, arr){
                return (value.carID.modelID.manID.name == seacrh.manufacturer);
            }))
        }
        return this.getCar(seacrh, array);
    }
    private getCar(seacrh: SearchModel, array: Advertisments[]){
        if(seacrh.car_type != "null"){
            return this.getWheelSearch(seacrh, array.filter(function(value, index, arr){
                return (value.carID.carTypeID.name == seacrh.car_type);
            }))
        }
        return this.getWheelSearch(seacrh, array);
    }
    private getWheelSearch(seacrh: SearchModel, array: Advertisments[]){
        if(seacrh.wheelDrive != "null"){
            return this.getDoors(seacrh, array.filter(function(value, index, arr){
                return (value.carID.wheelDriveID.type == seacrh.wheelDrive);
            }))
        }
        return this.getDoors(seacrh, array);
    }
    private getDoors(seacrh: SearchModel, array: Advertisments[]){
        if(seacrh.doors != 0){
            return this.getCity(seacrh, array.filter(function(value, index, arr){
                return (value.carID.doors == seacrh.doors);
            }))
        }
        return this.getCity(seacrh, array);
    }
    private getCity(seacrh: SearchModel, array: Advertisments[]){
        if(seacrh.city != "null"){
            return this.getYearSeacrh(seacrh, array.filter(function(value, index, arr){
                return (value.cityID.cityName == seacrh.city);
            }))
        }
        return this.getYearSeacrh(seacrh, array);
    }
    private getYearSeacrh(seacrh: SearchModel, array: Advertisments[]){
        var doneArray: Advertisments[] = new Array(0);
        
        array.forEach(ad => {
            if(ad.carID.year >= seacrh.year_from){
                if(seacrh.year_to != 0){
                    if(ad.carID.year <= seacrh.year_to){
                        doneArray.push(ad);
                    }
                }
                else{
                    doneArray.push(ad);
                }
            }
            else{
                return this.getPriceSearch(seacrh, array);
            }
        });

        return this.getPriceSearch(seacrh,doneArray);
    }
    private getPriceSearch(seacrh: SearchModel, array: Advertisments[]){
        var doneArray: Advertisments[] = new Array(0);

        array.forEach(ad => {
            if(ad.price >= seacrh.price_from){
                if(seacrh.price_to != 0){
                    if(ad.price <= seacrh.price_to){
                        doneArray.push(ad);
                    }
                }
                else{
                    doneArray.push(ad);
                }
            }
            else{
                return array;
            }
        });

        return doneArray;
    }
    
    async getCities(){
        return await this.ads.getCities();
    }
    async getEngines(){
        return await this.cars.returnEngines();
    }
    async getModels(){
        return await this.cars.returnModels();
    }
    async getTransm(){
        return await this.cars.returnTransm();
    }
    async getCarType(){
        return await this.cars.returnCarType();
    }
    async getWheel(){
        return await this.cars.returnWheelDrive();
    }
    async getMan(){
        return await this.cars.returnMan();
    }


}
