interface IPlace {
    id : string | number,
    name : string,
    address : string,
    coordination : {
        lat : number,
        long : number
    }
}

export default IPlace;
