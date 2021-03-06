import { Operation } from "@azure-tools/codemodel";
import { expect, assert } from 'chai';
import 'mocha';
import { NodeSelector } from '../src/plugins/modifier/cliDirectiveSelector';
import "@azure-tools/codemodel";


describe('Test Directive - Selector - operation', function () {
    it('select operation - normal', () => {

        let selector = new NodeSelector({
            select: 'operation',
            where: {
                operationGroup: 'og1',
                operation: 'o1',
            }
        });

        assert.isTrue(selector.match({
            operationGroupCliKey: 'og1',
            operationCliKey: 'o1',
            parent: null,
            targetIndex: -1,
            target: new Operation('fake', 'fake description'),
        }));

        assert.isNotTrue(selector.match({
            operationGroupCliKey: 'og1',
            operationCliKey: 'o1+',
            parent: null,
            targetIndex: -1,
            target: new Operation('fake', 'fake description'),
        }));

        assert.isNotTrue(selector.match({
            operationGroupCliKey: 'og1+',
            operationCliKey: 'o1',
            parent: null,
            targetIndex: -1,
            target: new Operation('fake', 'fake description'),
        }));

        assert.isNotTrue(selector.match({
            operationGroupCliKey: 'og1+',
            operationCliKey: 'o1+',
            parent: null,
            targetIndex: -1,
            target: new Operation('fake', 'fake description'),
        }));
    });

    it('select operation - normal without operationGroup', () => {

        let selector = new NodeSelector({
            select: 'operation',
            where: {
                operation: 'o1',
            }
        });

        assert.isTrue(selector.match({
            operationGroupCliKey: 'og1',
            operationCliKey: 'o1',
            parent: null,
            targetIndex: -1,
            target: new Operation('fake', 'fake description'),
        }));

        assert.isNotTrue(selector.match({
            operationGroupCliKey: 'og1',
            operationCliKey: 'o1+',
            parent: null,
            targetIndex: -1,
            target: new Operation('fake', 'fake description'),
        }));

        assert.isTrue(selector.match({
            operationGroupCliKey: 'og1+',
            operationCliKey: 'o1',
            parent: null,
            targetIndex: -1,
            target: new Operation('fake', 'fake description'),
        }));

        assert.isNotTrue(selector.match({
            operationGroupCliKey: 'og1+',
            operationCliKey: 'o1+',
            parent: null,
            targetIndex: -1,
            target: new Operation('fake', 'fake description'),
        }));
    });

    it('select operation - implicit select', () => {

        let selector = new NodeSelector({
            where: {
                operationGroup: 'og1',
                operation: 'o1',
            }
        });

        assert.isTrue(selector.match({
            operationGroupCliKey: 'og1',
            operationCliKey: 'o1',
            parent: null,
            targetIndex: -1,
            target: new Operation('fake', 'fake description'),
        }));

        assert.isNotTrue(selector.match({
            operationGroupCliKey: 'og1',
            operationCliKey: 'o1+',
            parent: null,
            targetIndex: -1,
            target: new Operation('fake', 'fake description'),
        }));

        assert.isNotTrue(selector.match({
            operationGroupCliKey: 'og1+',
            operationCliKey: 'o1',
            parent: null,
            targetIndex: -1,
            target: new Operation('fake', 'fake description'),
        }));

        assert.isNotTrue(selector.match({
            operationGroupCliKey: 'og1+',
            operationCliKey: 'o1+',
            parent: null,
            targetIndex: -1,
            target: new Operation('fake', 'fake description'),
        }));
    });

    it('select operation - alias', () => {

        let selector = new NodeSelector(new Object({
            where: {
                resource: 'og1',
                op: 'o1',
            }
        }));

        assert.isTrue(selector.match({
            operationGroupCliKey: 'og1',
            operationCliKey: 'o1',
            parent: null,
            targetIndex: -1,
            target: new Operation('fake', 'fake description'),
        }));

        assert.isNotTrue(selector.match({
            operationGroupCliKey: 'og1',
            operationCliKey: 'o1+',
            parent: null,
            targetIndex: -1,
            target: new Operation('fake', 'fake description'),
        }));

        assert.isNotTrue(selector.match({
            operationGroupCliKey: 'og1+',
            operationCliKey: 'o1',
            parent: null,
            targetIndex: -1,
            target: new Operation('fake', 'fake description'),
        }));

        assert.isNotTrue(selector.match({
            operationGroupCliKey: 'og1+',
            operationCliKey: 'o1+',
            parent: null,
            targetIndex: -1,
            target: new Operation('fake', 'fake description'),
        }));
    });

    it('select operation - regex', () => {

        let selector = new NodeSelector({
            where: {
                operationGroup: 'og1',
                operation: 'o.?1',
            }
        });

        assert.isTrue(selector.match({
            operationGroupCliKey: 'og1',
            operationCliKey: 'oa1',
            parent: null,
            targetIndex: -1,
            target: new Operation('fake', 'fake description'),
        }));

        assert.isTrue(selector.match({
            operationGroupCliKey: 'og1',
            operationCliKey: 'aboa1cd',
            parent: null,
            targetIndex: -1,
            target: new Operation('fake', 'fake description'),
        }));

        assert.isNotTrue(selector.match({
            operationGroupCliKey: 'og1',
            operationCliKey: 'oab1',
            parent: null,
            targetIndex: -1,
            target: new Operation('fake', 'fake description'),
        }));

        assert.isNotTrue(selector.match({
            operationGroupCliKey: 'og1+',
            operationCliKey: 'o1',
            parent: null,
            targetIndex: -1,
            target: new Operation('fake', 'fake description'),
        }));
    });

});