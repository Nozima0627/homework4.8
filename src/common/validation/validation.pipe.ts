import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class PositivePipe implements PipeTransform{
    transform(value: any) {
        if(isNaN(+value) || value<0){
            throw new BadRequestException("Id must be a positive number");
        }

        return +value;
    }
}