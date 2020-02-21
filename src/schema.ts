import {
    Metadata,
} from "@azure-tools/codemodel";

export type NamingStyle = 'camel' | 'pascal' | 'snake' | 'upper' | 'kebab' | 'space';
export type SelectType = 'operationGroup' | 'operation' | 'parameter' | 'objectSchema' | 'property';
export type LanguageType = 'cli' | 'default';

export namespace CliConst {
    // Todo: merge this into code model?
    export const CLI: string = "cli";
    export const CLI_FORMATTABLE: string = "formatTable";
    export const CLI_FORMATTABLE_PROPERTIES: string = "properties";
    export const CLI_DIRECTIVE: string = "cli-directive";

    export class NamingStyle {
        /** camelCase */
        static readonly camel = "camel";
        /** PascalCase */
        static readonly pascal = "pascal";
        /** snake_case */
        static readonly snake = "snake";
        /** kebab-case */
        static readonly kebab = "kebab";
        /** space case */
        static readonly space = "space";
        /** UPPER_CASE */
        static readonly upper = "upper";
    };

    export class SelectType {
        static readonly operationGroup = 'operationGroup';
        static readonly operation = 'operation';
        static readonly parameter = 'parameter';
        static readonly objectSchema = 'objectSchema';
        static readonly property = 'property';
    }
}

export namespace CliCommonSchema {

    export namespace CliDirective {

        export interface LogClause {
            position?: 'pre' | 'post' | 'both';
            message?: string;
            logLevel?: string;
        }

        export interface SetClause {
        }

        export interface SetNameClause {
            /** name in kebab-case */
            name: string;
        }

        export interface ReplaceClause {
            field: string;
            isRegex?: boolean;
            old: string;
            new: string;
        }

        export interface WhereClause {
            operationGroup?: string;
            operation?: string;
            parameter?: string;
            objectSchema?: string;
            property?: string;
        }

        export interface FormatTableClause {
            properties?: string[];
        }

        export interface Directive {
            select?: SelectType;
            where?: WhereClause;
            set?: SetClause;
            /** in kebab-case */
            setName?: SetNameClause;
            log?: LogClause;
            replace?: ReplaceClause;
            formatTable?: FormatTableClause;
        }
    }

    export interface NamingConvention {
        singularize?: boolean
        parameter?: NamingStyle
        operation?: NamingStyle
        operationGroup?: NamingStyle
        property?: NamingStyle
        type?: NamingStyle
    }

    export namespace CodeModel {
        export interface NodeDescriptor {
            operationGroupName?: string;
            operationName?: string;
            parameterName?: string;
            objectSchemaName?: string;
            propertyName?: string;
            metadata: Metadata;
        }
    }
}