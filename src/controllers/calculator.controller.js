import stringMath from 'string-math';
import models from '../models/index';

/**
 * @description Contains all add, subtract, division, and multiplication operations
 * @export
 * @class Calculator
 */
class Calculator {
  /**
 *
 * @description Method to perform all the four basic mathematical operations
 * @static
 * @param {object} req client request
 * @param {object} res server response
 * @returns {Object} server response object
 * @memberof Calculator
 */
  static async performOperaration(req, res) {
    try {
      let response;
      let passed;
      if (!req.body.expr) return res.status(400).send({ result: null, error: 'Required query parameter "expr" missing in url' });
      const result = stringMath(req.body.expr);
      // generate a random number and round it off
      const randomNumber = Math.round(Math.random());
      response = result;
      passed = 'Yes';
      if (randomNumber === 1) {
        response = Math.round((Math.random()) * 4000);
        passed = 'No';
      }
    
      // extracts number1 and number2 from the string
      const trimmedExpr = (req.body.expr).replace(/\s/g, ''); // this removes any white space
      const operator = trimmedExpr.replace(/\d+([,.]\d+)?/g,''); // get the operator
      const arr = trimmedExpr.split(operator, 2); // this extracts two numbers separated by an operator
      await models.Result.create({
        number1: arr[0], number2: arr[1], response, expected: result, passed
      }).then(() => res.status(201).send({
        result, error: null
      }));
    } catch (error) {
      return res.status(400).send({ result: null, error: 'The equation is invalid' });
    }
  }

  /**
   *
   * @description Method to delete a particular record from the results table
   * @static
   * @param {*} id
   * @returns
   * @memberof Calculator
   */
  static async deleteRecord(req, res) {
    try {
      const id = req.params.id;
      const removeRecord = await models.Result.findOne({ where: { id: Number(id) } });
     
      if (removeRecord) {
        await models.Result.destroy({
          where: { id: Number(id) }
        });
        return res.send({'message':'deleted successfully'})
      }
    } catch (error) {
      return  (error);
    }
  }
 
  static async getAllRecords(req,res) {
    try {
      await models.Result.findAll().then((result)=>{
        return res.send({data:result});
      });
    
    } catch (error) {
      return (error);
    }
  }
}
export default Calculator;
