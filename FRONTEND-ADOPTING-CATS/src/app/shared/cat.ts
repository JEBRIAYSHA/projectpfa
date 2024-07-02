export class Cat {

    id!: any;
    name!: string;
    race!: string;
    weight!: number;
    sex!: string; //(male ou femelle)
    dat_of_birth!: Date;
    age!: number; //  par semaine (readonly)
    vaccinations!: string[]; // (contient les vaccins reçues)
    description!: string;
    status!: boolean; //(disponible/adopté)
    mediacl_history!: string  //l'historique medical(maladie , traitement en cours, operations medicale )
    image!: string;


constructor(id: any, name: string, race: string,
        //  weight : number , 
        sex: string,
        //   dat_of_birth : Date ,
        age: number, //  par semaine readonly
        vaccinations : string[] ,
        //  description : string ,
        status: boolean
        //  image : string 
    ) {

        this.id = id;
        this.name = name;
        this.race = race;
        // this.weight = weight;
        this.sex = sex;
        // this.dat_of_birth = dat_of_birth ;
        this.age = age;
         this.vaccinations = vaccinations;
        // this.description = description ,
        this.status = status;
        // this.image = image ;

    }


}







