

export interface ApisResponseRootObject {
    value?: Api[];
    count?: number;
  }

  export interface Api {
    id?: string;
    type?: string;
    name?: string;
    properties?: ApiProperties;
    schemas?: ApiSchema[];
    _schemas?: ApiSchema | ApiSchema[];
    operations?: Operation[];
  }

  export interface OperationsResponse {
    value?: Operation[];
    count?: number;
  }

  export interface Operation {
    id?: string;
    type?: string;
    name?: string;
    properties?: OperationProperties;
  }

  export interface OperationProperties {
    scope: string;
    operationImgName?: string;
    operationMarkdownUrl?: string;
    displayName?: string;
    method?: string;
    urlTemplate: string;
    urlFull: string;
    templateParameters: any[];
    description: string | PortalDevOperationDescription;
    request: RequestOperationProperty;
    responses: OperationResponse[];
    policies?: any;
  }
  export interface PortalDevOperationDescription {
    description: string;
    portalDev: {
      scope: any;
      operationImgName: string;
      docsFolder: string;
    };
  }

  export interface OperationResponse {
    statusCode: number;
    description: string;
    representations?: Representation[];
    headers?: any[];
  }

  export interface Representation {
    contentType: string;
    examples?: Example | Example[];
    schemaId: string;
    typeName: string;
    typeSchema?: any;
    itemRef: any;
    generatedSample?: string;
    sample?: string;
  }

  export interface Example {
    description: string;

    /**
     * Example value.
     */
    value: any;

    /**
     * A URL that points to the example
     */
    externalValue: string;
  }

  export interface Default {
    value?: any[];
  }


  export interface RequestOperationProperty {
    queryParameters?: QueryParameter[];
    headers?: Header[];
    representations?: any[];
  }

  export interface QueryParameter {
    name: string;
    description: string;
    type: string;
    values?: any[];
    schemaId: string;
    typeName: string;
  }

  export interface Header {
    name: string;
    description: string;
    type: string;
    required: boolean;
  }

export interface SchemaResponseObject{
  value?: ApiSchema | ApiSchema[] ;
  count: number;
}
  export interface ApiSchema {
    id: string;
    type: string;
    name: string;
    properties?: SchemaProperties;
  }

  export interface SchemaProperties {
    contentType: string;
    document: SchemaDocument;
  }

  export interface SchemaDocument {
    components: SchemaComponents;
  }

  export interface SchemaComponents {
    schemas: Schema;
  }

  export interface Schema {
    type?: string;
    description?: string;
    format?: string;
    nullable?: boolean;
    example?: string;
  }

  export interface ApiProperties {
    displayName: string;
    apiRevision: string;
    description: string;
    subscriptionRequired: boolean;
    serviceUrl: string;
    path: string;
    protocols: string[];
    authenticationSettings?: any;
    subscriptionKeyParameterNames?: any;
    isCurrent: boolean;
    apiVersion: string;
    apiVersionSetId: string;
  }

  export interface ParameterContract {
    /**
     * Parameter name, e.g. api-version.
     */
    name: string;

    /**
     * Parameter description.
     */
    description: string;

    /**
     * Parameter placement, e.g. "query", "template", "header", "body".
     */
    in: string;

    /**
     * Parameter type, e.g. "string", "int64", etc.
     */
    type: string;

    /**
     * Parameter default value, e.g. "2018-06-01-preview".
     */
    defaultValue: string;

    /**
     * Parameter value suggestions, e.g. ["2016-07-07","2016-10-10", "2018-06-01-preview"]
     */
    values: string[];

    /**
     * Indicates if the parameter is required to make a request.
     */
    required: boolean;

    /**
     * Object containing examples of the parameter.
     */
    examples: Example[];
}
