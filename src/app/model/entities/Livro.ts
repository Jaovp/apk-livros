export class Livro{
    private _id!: string;
    private _titulo: string;
    private _autor: string;
    private _ano: number;
    private _genero: string;
    private _editora: string;

    constructor(titulo: string, autor: string, ano: number, genero: string, editora: string){
        this._titulo = titulo;
        this._autor = autor;
        this._ano = ano;
        this._genero = genero;
        this._editora = editora;
    }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get titulo(): string {
        return this._titulo;
    }
    public set titulo(value: string) {
        this._titulo = value;
    }

    public get autor(): string {
        return this._autor;
    }
    public set autor(value: string) {
        this._autor = value;
    }

    public get ano(): number {
        return this._ano;
    }
    public set ano(value: number) {
        this._ano = value;
    }

    public get genero(): string {
        return this._genero;
    }
    public set genero(value: string) {
        this._genero = value;
    }

    public get editora(): string {
        return this._editora;
    }
    public set editora(value: string) {
        this._editora = value;
    }


}