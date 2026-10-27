import {} from "express";
import { pool } from '../config/db.js';
import {} from '../interfaces/word.interface.js';
export const getPage = (req, res) => {
    res.json({ message: 'working.' });
};
// get Get the list containing all words
export const getList = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM words');
        res.json(result.rows);
    }
    catch (error) {
        console.log(error);
    }
};
// get a specific word
export const getDefinition = async (req, res) => {
    const id = req.params.id;
    try {
        // console.log(id);
        // res.json({
        //   message: "Got ID",
        //   data: id
        // })
        const result = await pool.query('SELECT * FROM words WHERE id=($1)', [id]);
        // console.log('result.rows', result.rows[0]);
        // console.log('result', result);
        // let def = result.rows[0].definitions.map((definition: any) => definition.definition);
        res.send(result.rows[0]);
    }
    catch (error) {
        console.log(error);
    }
};
// create new word 
export const postDefinition = async (req, res) => {
    try {
        const { name, categories, definitions } = req.body;
        if (!name || !definitions) {
            console.log('Missing information.');
        }
        const newWord = {
            name: req.body.name,
            categories: req.body.categories,
            definitions: req.body.definitions
        };
        // console.log(newWord.definitions.map((definition) => definition.definition));
        res.send(newWord);
    }
    catch (error) {
        console.log(error);
    }
};
// export const deleteDefinition = async (req: Request, res: Response) => {
//   const id = req.params.id;
//   try {
//   }
// }
//# sourceMappingURL=list.controller.js.map