import {JSONSchema7} from 'json-schema';

class SchemaEntryError extends Error {}

interface SchemaEntryParams {
	name: string,
	key: string,
	value: any,
	config: any
}

class SchemaEntry{
	constructor(params: SchemaEntryParams)
	isValidSchema(): boolean
	error(msg:string): void
	get obj(): SchemaEntryParams
	toEntry():string
	string(config:any):string
	number(config:any):string
	boolean(config:any):string
	array(config:any):string
	object(config:any):string
	date(config:any):string
	mixed(config:any):string

}


export default {
	buildTypes: (schema: JSONSchema7, config: any, typeMarker:string = 'type') => string,
  createSchemaEntry: (params: SchemaEntryParams) => string,
  SchemaEntry,
  SchemaEntryError,
  types
}