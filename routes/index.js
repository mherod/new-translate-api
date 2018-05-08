const express = require('express');
const router = express.Router();

const translate = require('google-translate-api');

router.get('/', function (req, res, next) {

    const originalTranslationText = req.query.o;

    if (originalTranslationText.length === 0) {
        res.status(500).send('Empty request');
        return;
    }

    const orLang = 'en';
    const toLang = 'ja';

    translate(originalTranslationText, {from: orLang, to: toLang}).then(translationResult1 => {
        translate(translationResult1.text, {from: toLang, to: orLang}).then(translationResult2 => {
            translate(translationResult2.text, {from: orLang, to: toLang}).then(translationResult3 => {
                translate(translationResult3.text, {from: toLang, to: orLang}).then(translationResult4 => {
                    res.render('index', {
                        translationResult: translationResult4.text
                    });
                }).catch(err => {
                    res.status(500).send('Problem 4 :( ' + err);
                });
            }).catch(err => {
                res.status(500).send('Problem 3 :( ' + err);
            });
        }).catch(err => {
            res.status(500).send('Problem 2 :( ' + err);
        });
    }).catch(err => {
        res.status(500).send('Problem 1 :( ' + err);
    });
});

module.exports = router;
