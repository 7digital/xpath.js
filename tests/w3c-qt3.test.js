'use strict';

const fs = require('fs');

const {DOMParser} = require('xmldom');

const select = require('../xpath.js');

const qt3Suite = process.env.QT3_SUITE;

describe('QT3 Test Suite', () => {
    const catalogueContent = fs.readFileSync(`${qt3Suite}/catalog.xml`, 'utf-8');

    const domParser = new DOMParser();

    const catalog = domParser.parseFromString(catalogueContent);

    const testSetNodes = select(catalog, '/catalog/test-set');

    for (let testSet of testSetNodes) {
        describe(testSet.getAttribute('name'), () => {
            const testSetContent = fs.readFileSync(`${qt3Suite}/${testSet.getAttribute('file')}`, 'utf-8');

            const testSetDoc = domParser.parseFromString(testSetContent);

            const testCaseNodes = select(testSetDoc, '/test-set/test-case');

            for (let testCase of testCaseNodes) {
                it(testCase.getAttribute('name'), () => {
                    expect(true).toBeTruthy();
                })
            }
        });
    }
});