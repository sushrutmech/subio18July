
export class User {



    constructor(
        public firstName: string,
        public lastName: string,
        public preferredName: string,
        public jobTitle: string,
        public contactNumber: number,
        public profilePic: string,
        public emailAddress: string,
        private _token:string,
        private _tokenExpirationDate:string
    ) { }

   // get token(){}


}