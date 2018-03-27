/*
@license
Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
This code may only be used under the modified Apache license found at https://raw.githubusercontent.com/EddieMachete/rhi-core-isncsci-algorithm/master/LICENSE
Author: RhiTech <tech@rickhanseninstitute.org>
*/
'use strict';
/**
* The 'rhi-core-isncsci-totals' contains the raw results from running an ISNCSCI Examination through the ISNCSCI Algorithm.
* @demo demo/index.html
*/
export class IsncsciTotals {
    constructor() {
        /***********************************************/
        /* ***** Public properties ********** */
        /***********************************************/
        this.asiaImpairmentScaleValues = [];
        this.hasLeftCollins = false;
        this.hasRightCollins = false;
        this.leftLowerMotorContainsNt = false;
        this.leftLowerMotorTotal = 0;
        this.leftLowerMotorTotalHasImpairmentNotDueToSci = false;
        this.leftMotorHasOnlySoftValues = true;
        this.leftMotorValues = [];
        this.leftMotorZppHasOnlySoftValues = true;
        this.leftMotorZppValues = [];
        this.leftPrickContainsNt = false;
        this.leftPrickTotal = 0;
        this.leftPrickTotalHasImpairmentNotDueToSci = false;
        this.leftSensoryHasOnlySoftValues = true;
        this.leftSensoryValues = [];
        this.leftSensoryZppHasOnlySoftValues = true;
        this.leftSensoryZppValues = [];
        this.leftTouchContainsNt = false;
        this.leftTouchTotal = 0;
        this.leftTouchTotalHasImpairmentNotDueToSci = false;
        this.leftUpperMotorContainsNt = false;
        this.leftUpperMotorTotal = 0;
        this.leftUpperMotorTotalHasImpairmentNotDueToSci = false;
        this.mostCaudalLeftLevelWithMotorFunction = null;
        this.mostCaudalLeftMotor = null;
        this.mostCaudalNeurologicalLevelOfInjury = null;
        this.mostCaudalRightLevelWithMotorFunction = null;
        this.mostCaudalRightMotor = null;
        this.mostRostralLeftLevelWithMotorFunction = null;
        this.mostRostralLeftMotor = null;
        this.mostRostralNeurologicalLevelOfInjury = null;
        this.mostRostralRightLevelWithMotorFunction = null;
        this.mostRostralRightMotor = null;
        this.neurologicalLevelOfInjuryHasOnlySoftValues = true;
        this.neurologicalLevelsOfInjury = [];
        this.rightLowerMotorContainsNt = false;
        this.rightLowerMotorTotal = 0;
        this.rightLowerMotorTotalHasImpairmentNotDueToSci = false;
        this.rightMotorHasOnlySoftValues = true;
        this.rightMotorValues = [];
        this.rightMotorZppHasOnlySoftValues = true;
        this.rightMotorZppValues = [];
        this.rightPrickContainsNt = false;
        this.rightPrickTotal = 0;
        this.rightPrickTotalHasImpairmentNotDueToSci = false;
        this.rightSensoryHasOnlySoftValues = true;
        this.rightSensoryValues = [];
        this.rightSensoryZppHasOnlySoftValues = true;
        this.rightSensoryZppValues = [];
        this.rightTouchContainsNt = false;
        this.rightTouchTotal = 0;
        this.rightTouchTotalHasImpairmentNotDueToSci = false;
        this.rightUpperMotorContainsNt = false;
        this.rightUpperMotorTotal = 0;
        this.rightUpperMotorTotalHasImpairmentNotDueToSci = false;
    }
    /***********************************************/
    /* ***** Private, static properties ********** */
    /***********************************************/
    static get is() { return 'rhi-core-isncsci.Totals'; }
    /***********************************************/
    /* ***** Private, static methods ************* */
    /***********************************************/
    /**
    * Returns true if the specified levelName belongs to a level already contained in the values array provided.
    *
    * @param {NeuroLevel[]} values (required) The value array where we are trying to find a match.
    * @param {string} levelName (required) The name of the ISNCSCI Level name we are searching for.
    * @return {boolean} True if a match for levelName is found in the value array, false otherwise.
    */
    static containsLevelWithName(values, levelName) {
        const key = levelName.toUpperCase();
        return values.find((level) => level.name === key) !== undefined;
    }
    /**
    * Produces a string containing the values in the provided array, ordered by ordinal, and separated by commas.
    *
    * @param {NeuroLevel[]} values (required) The value array to be converted to a string.
    * @return {string} Comma separated list.
    */
    static getValuesString(values) {
        if (!values)
            throw new Error(`${IsncsciTotals.is} : getValuesString : Missing required parameter values:NeuroLevel[]`);
        let result = '';
        const sortedList = values.sort((a, b) => { return a.ordinal - b.ordinal; });
        const sortedListLength = sortedList.length;
        for (var i = 0; i < sortedListLength; i++)
            result += i > 0 ? ',' + sortedList[i].name : sortedList[i].name;
        return result;
    }
    /**
    * Formats a total value depending on the specified flags.
    *
    * @param {number} total Raw total value.
    * @param {boolean} hasImpairmentNotDueToSci Flag indicating if any value used in the calculation of this total presents impairment not due to a spinal cord injury.
    * @param {boolean} containsNt Flag indicating if any value used in the calculation of this total is set to Not Testable.
    *
    * @return {string} The value, followed by an exclamation mark if the hasImpairmentNotDueToSci is set to true or UTD (Unable to determine) if the containsNt flag is set to true.
    */
    static getSummaryStringFor(total, hasImpairmentNotDueToSci, containsNt) {
        if (containsNt)
            return IsncsciTotals.notDeterminable;
        return hasImpairmentNotDueToSci ? (total.toString() + '!') : total.toString();
    }
    /**
     * Checks if there the totals currently have no possible right sensory values.
    *
    * @return {boolean} True if there are no recorded possible right sensory values.
    */
    isRightSensoryEmpty() {
        return this.rightSensoryValues.length === 0;
    }
    /**
     * Adds a neurological level to the list of possible right sensory values.
    *
    * @param {NeuroLevel} level (required) The neurological level to be added to the right sensory values.
    */
    addRightSensoryValue(level) {
        if (!level)
            throw new Error(`${IsncsciTotals.is} : addRightSensoryValue : Missing expected argument level:NeuroLevel`);
        if (IsncsciTotals.containsLevelWithName(this.rightSensoryValues, level.name))
            return;
        this.rightSensoryValues.push(level);
    }
    /**
     * Produces a list of possible right sensory values.
    *
    * @return {NeuroLevel[]} List possible right sensory values.
    */
    getRightSensoryValues() {
        return this.rightSensoryValues.slice(0);
    }
    /**
     * Produces an ordered list of all possible right sensory values, separated by commas.
    *
    * @return {string} Comma separated list of possible right sensory values.
    */
    getRightSensoryLongValueString() {
        return IsncsciTotals.getValuesString(this.rightSensoryValues);
    }
    /**
     * Returns true if the specified levelName belongs to right sensory values list.
    *
    * @param {string} levelName (required) The name of the ISNCSCI Level name we are searching for.
    * @return {boolean} True if a match for levelName is found in the right sensory value list, false otherwise.
    */
    rightSensoryContains(levelName) {
        if (!levelName)
            throw new Error(`${IsncsciTotals.is} : rightSensoryContains : Invalid arguments passed. Expected levelName:String`);
        return IsncsciTotals.containsLevelWithName(this.rightSensoryValues, levelName);
    }
    /**
     * Checks if there the totals currently have no possible leftSensory values.
    *
    * @return {boolean} True if there are no recorded possible left sensory values.
    */
    isLeftSensoryEmpty() {
        return this.leftSensoryValues.length === 0;
    }
    /**
     * Adds a neurological level to the list of possible left sensory values.
    *
    * @param {NeuroLevel} level (required) The neurological level to be added to the left sensory values.
    */
    addLeftSensoryValue(level) {
        if (!level)
            throw new Error(`${IsncsciTotals.is} : addLeftSensoryValue : Invalid arguments passed. Expected level:NeuroLevel`);
        if (IsncsciTotals.containsLevelWithName(this.leftSensoryValues, level.name))
            return;
        this.leftSensoryValues.push(level);
    }
    /**
     * Produces a list of possible left sensory values.
    *
    * @return {NeuroLevel[]} List possible left sensory values.
    */
    getLeftSensoryValues() {
        return this.leftSensoryValues.slice(0);
    }
    /**
     * Produces an ordered list of all possible left sensory values, separated by commas.
    *
    * @return {string} Comma separated list of possible left sensory values.
    */
    getLeftSensoryLongValueString() {
        return IsncsciTotals.getValuesString(this.leftSensoryValues);
    }
    /**
     * Returns true if the specified levelName belongs to left sensory values list.
    *
    * @param {string} levelName (required) The name of the ISNCSCI Level name we are searching for.
    * @return {boolean} True if a match for levelName is found in the left sensory value list, false otherwise.
    */
    leftSensoryContains(levelName) {
        if (!levelName)
            throw new Error(`${IsncsciTotals.is} : leftSensoryContains : Invalid arguments passed. Expected levelName:String`);
        return IsncsciTotals.containsLevelWithName(this.leftSensoryValues, levelName);
    }
    /**
     * Checks if there the totals currently have no possible right motor values.
    *
    * @return {boolean} True if there are no recorded possible right motor values.
    */
    isRightMotorEmpty() {
        return this.rightMotorValues.length === 0;
    }
    /**
     * Adds a neurological level to the list of possible right motor values.
    *
    * @param {NeuroLevel} level (required) The neurological level to be added to the right motor values.
    */
    addRightMotorValue(level) {
        if (!level)
            throw new Error(`${IsncsciTotals.is} : addRightMotorValue : Invalid arguments passed. Expected level:NeuroLevel`);
        if (IsncsciTotals.containsLevelWithName(this.rightMotorValues, level.name))
            return;
        if (this.mostRostralRightMotor == null || level.ordinal < this.mostRostralRightMotor.ordinal)
            this.mostRostralRightMotor = level;
        if (this.mostCaudalRightMotor == null || level.ordinal > this.mostCaudalRightMotor.ordinal)
            this.mostCaudalRightMotor = level;
        this.rightMotorValues.push(level);
    }
    /**
     * Produces a list of possible right motor values.
    *
    * @return {NeuroLevel[]} List possible right motor values.
    */
    getRightMotorValues() {
        return this.rightMotorValues.slice(0);
    }
    /**
     * Produces an ordered list of all possible right motor values, separated by commas.
    *
    * @return {string} Comma separated list of possible right motor values.
    */
    getRightMotorLongValueString() {
        return IsncsciTotals.getValuesString(this.rightMotorValues);
    }
    /**
     * Returns true if the specified levelName belongs to right motor values list.
    *
    * @param {string} levelName (required) The name of the ISNCSCI Level name we are searching for.
    * @return {boolean} True if a match for levelName is found in the right motor value list, false otherwise.
    */
    rightMotorContains(levelName) {
        if (!levelName)
            throw new Error(`${IsncsciTotals.is} : rightMotorContains : Invalid arguments passed. Expected levelName:String`);
        return IsncsciTotals.containsLevelWithName(this.rightMotorValues, levelName);
    }
    /**
     * Checks if there the totals currently have no possible left motor values.
    *
    * @return {boolean} True if there are no recorded possible left motor values.
    */
    isLeftMotorEmpty() {
        return this.leftMotorValues.length === 0;
    }
    /**
     * Adds a neurological level to the list of possible left motor values.
    *
    * @param {NeuroLevel} level (required) The neurological level to be added to the left motor values.
    */
    addLeftMotorValue(level) {
        if (!level)
            throw new Error(`${IsncsciTotals.is} : addLeftMotorValue : Invalid arguments passed. Expected level:NeuroLevel`);
        if (IsncsciTotals.containsLevelWithName(this.leftMotorValues, level.name))
            return;
        if (this.mostRostralLeftMotor == null || level.ordinal < this.mostRostralLeftMotor.ordinal)
            this.mostRostralLeftMotor = level;
        if (this.mostCaudalLeftMotor == null || level.ordinal > this.mostCaudalLeftMotor.ordinal)
            this.mostCaudalLeftMotor = level;
        this.leftMotorValues.push(level);
    }
    /**
     * Produces a list of possible left motor values.
    *
    * @return {NeuroLevel[]} List possible left motor values.
    */
    getLeftMotorValues() {
        return this.leftMotorValues.slice(0);
    }
    /**
     * Produces an ordered list of all possible left motor values, separated by commas.
    *
    * @return {string} Comma separated list of possible left motor values.
    */
    getLeftMotorLongValueString() {
        return IsncsciTotals.getValuesString(this.leftMotorValues);
    }
    /**
     * Returns true if the specified levelName belongs to left motor values list.
    *
    * @param {string} levelName (required) The name of the ISNCSCI Level name we are searching for.
    * @return {boolean} True if a match for levelName is found in the left motor value list, false otherwise.
    */
    leftMotorContains(levelName) {
        if (!levelName)
            throw new Error(`${IsncsciTotals.is} : leftMotorContains : Invalid arguments passed. Expected levelName:String`);
        return IsncsciTotals.containsLevelWithName(this.leftMotorValues, levelName);
    }
    /**
     * Adds a neurological level to the list of possible neurological level of injury values.
    *
    * @param {NeuroLevel} level (required) The neurological level to be added to the neurological level of injury values.
    */
    addNeurologicalLevelOfInjury(level) {
        if (!level)
            throw new Error(`${IsncsciTotals.is} : addNeurologicalLevelOfInjury : Invalid arguments passed. Expected level:NeuroLevel`);
        if (IsncsciTotals.containsLevelWithName(this.neurologicalLevelsOfInjury, level.name))
            return;
        if (this.mostRostralNeurologicalLevelOfInjury == null || level.ordinal < this.mostRostralNeurologicalLevelOfInjury.ordinal)
            this.mostRostralNeurologicalLevelOfInjury = level;
        if (this.mostCaudalNeurologicalLevelOfInjury == null || level.ordinal > this.mostCaudalNeurologicalLevelOfInjury.ordinal)
            this.mostCaudalNeurologicalLevelOfInjury = level;
        this.neurologicalLevelsOfInjury.push(level);
    }
    /**
     * Produces a list of possible neurological levels of injury.
    *
    * @return {NeuroLevel[]} List possible neurological levels of injury.
    */
    getNeurologicalLevelsOfInjury() {
        return this.neurologicalLevelsOfInjury.slice(0);
    }
    /**
     * Produces an alphabetically ordered list of all possible Neurological Levels of Injury, separated by commas.
    *
    * @return {string} Comma separated list of possible Neurological Levels of Injury.
    */
    getNeurologicalLevelsOfInjuryLongValueString() {
        return IsncsciTotals.getValuesString(this.neurologicalLevelsOfInjury);
    }
    /**
     * Checks if there the totals currently have no possible right sensory ZPP values.
    *
    * @return {boolean} True if there are no recorded possible right sensory ZPP values.
    */
    isRightSensoryZppEmpty() {
        return this.rightSensoryZppValues.length === 0;
    }
    /**
     * Adds a neurological level to the list of possible right sensory ZPP values.
    *
    * @param {NeuroLevel} level (required) The neuroligical level to be added to the possible right sensory ZPP values.
    */
    addRightSensoryZppValue(level) {
        if (!level)
            throw new Error(`${IsncsciTotals.is} : addRightSensoryZppValue : Invalid arguments passed. Expected level:NeuroLevel`);
        if (IsncsciTotals.containsLevelWithName(this.rightSensoryZppValues, level.name)
            || 'S4_5' === level.name)
            return;
        this.rightSensoryZppValues.push(level);
    }
    /**
     * Produces a list of possible right sensory ZPP values.
    *
    * @return {NeuroLevel[]} List possible right sensory ZPP values
    */
    getRightSensoryZppValues() {
        return this.rightSensoryZppValues.slice(0);
    }
    /**
     * Produces an ordered list of all possible right sensory Zone of Partial Preservation values, separated by commas.
    *
    * @return {string} Comma separated list of possible right sensory Zone of Partial Preservation values.
    */
    getRightSensoryZppLongValueString() {
        return IsncsciTotals.getValuesString(this.rightSensoryZppValues);
    }
    /**
     * Checks if there the totals currently have no possible left sensory ZPP values.
    *
    * @return {boolean} True if there are no recorded possible left sensory ZPP values.
    */
    isLeftSensoryZppEmpty() {
        return this.leftSensoryZppValues.length === 0;
    }
    /**
     * Adds a neurological level to the list of possible left sensory ZPP values.
    *
    * @param {NeuroLevel} level (required) The neuroligical level to be added to the possible left sensory ZPP values.
    */
    addLeftSensoryZppValue(level) {
        if (!level)
            throw new Error(`${IsncsciTotals.is} : addLeftSensoryZppValue : Invalid arguments passed. Expected level:NeuroLevel`);
        if (IsncsciTotals.containsLevelWithName(this.leftSensoryZppValues, level.name)
            || 'S4_5' === level.name)
            return;
        this.leftSensoryZppValues.push(level);
    }
    /**
     * Produces a list of possible left sensory ZPP values.
    *
    * @return {NeuroLevel[]} List possible left sensory ZPP values
    */
    getLeftSensoryZppValues() {
        return this.leftSensoryZppValues.slice(0);
    }
    /**
     * Produces an ordered list of all possible left sensory Zone of Partial Preservation values, separated by commas.
    *
    * @return {string} Comma separated list of possible left sensory Zone of Partial Preservation values.
    */
    getLeftSensoryZppLongValueString() {
        return IsncsciTotals.getValuesString(this.leftSensoryZppValues);
    }
    /**
     * Checks if there the totals currently have no possible right motor ZPP values.
    *
    * @return {boolean} True if there are no recorded possible right motor ZPP values.
    */
    isRightMotorZppEmpty() {
        return this.rightMotorZppValues.length === 0;
    }
    /**
     * Adds a neurological level to the list of possible right motor ZPP values.
    *
    * @param {NeuroLevel} level (required) The neuroligical level to be added to the possible right motor ZPP values.
    */
    addRightMotorZppValue(level) {
        if (!level)
            throw new Error(`${IsncsciTotals.is} : addRightMotorZppValue : Invalid arguments passed. Expected level:NeuroLevel`);
        if (IsncsciTotals.containsLevelWithName(this.rightMotorZppValues, level.name)
            || 'S4_5' === level.name)
            return;
        this.rightMotorZppValues.push(level);
    }
    /**
     * Produces a list of possible right motor ZPP values.
    *
    * @return {NeuroLevel[]} List possible right motor ZPP values
    */
    getRightMotorZppValues() {
        return this.rightMotorZppValues.slice(0);
    }
    /**
     * Produces an ordered list of all possible right motor Zone of Partial Preservation values, separated by commas.
    *
    * @return {string} Comma separated list of possible right motor Zone of Partial Preservation values.
    */
    getRightMotorZppLongValueString() {
        return IsncsciTotals.getValuesString(this.rightMotorZppValues);
    }
    /**
     * Checks if there the totals currently have no possible left motor ZPP values.
    *
    * @return {boolean} True if there are no recorded possible left motor ZPP values.
    */
    isLeftMotorZppEmpty() {
        return this.leftMotorZppValues.length === 0;
    }
    /**
     * Adds a neurological level to the list of possible left motor ZPP values.
    *
    * @param {NeuroLevel} level (required) The neuroligical level to be added to the possible left motor ZPP values.
    */
    addLeftMotorZppValue(level) {
        if (!level)
            throw new Error(`${IsncsciTotals.is} : addLeftMotorZppValue : Invalid arguments passed. Expected level:NeuroLevel`);
        if (IsncsciTotals.containsLevelWithName(this.leftMotorZppValues, level.name)
            || 'S4_5' === level.name)
            return;
        this.leftMotorZppValues.push(level);
    }
    /**
     * Produces a list of possible left motor ZPP values.
    *
    * @return {NeuroLevel[]} List possible left motor ZPP values
    */
    getLeftMotorZppValues() {
        return this.leftMotorZppValues.slice(0);
    }
    /**
     * Produces an ordered list of all possible left motor Zone of Partial Preservation values, separated by commas.
    *
    * @return {string} Comma separated list of possible left motor Zone of Partial Preservation values.
    */
    getLeftMotorZppLongValueString() {
        return IsncsciTotals.getValuesString(this.leftMotorZppValues);
    }
    /**
     * Adds an AIS value to the list of possible impairment values.
    *
    * @param {string} value (required) The AIS value to be recorded.
    */
    addAsiaImpairmentScaleValue(value) {
        if (!value)
            throw new Error(`${IsncsciTotals.is} : addAsiaImpairmentScaleValue : Invalid arguments passed. Expected value:String`);
        var valueToUpper = value.toUpperCase();
        // Do not enter the value twice if it is already contained in the list                
        if (this.asiaImpairmentScaleValues.indexOf(valueToUpper) != -1)
            return;
        this.asiaImpairmentScaleValues.push(valueToUpper);
    }
    /**
     * Produces a string of alphabetically sorted AIS values concatenated by commas.
    *
    * @return {string} List of AIS values, sorted alphabetically, and concatenated by commas. E.g. 'A,C,E'
    */
    getAsiaImpairmentScaleValues() {
        return this.asiaImpairmentScaleValues.sort().join();
    }
    /**
     * Total from adding all left lower motor values.
    *
    * @return {string} The total produced by adding all left lower motor values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    getLeftLowerMotorTotal() {
        return IsncsciTotals.getSummaryStringFor(this.leftLowerMotorTotal, this.leftLowerMotorTotalHasImpairmentNotDueToSci, this.leftLowerMotorContainsNt);
    }
    /**
     * Total from adding all left motor values.
    *
    * @return {string} The total produced by adding all left motor values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    getLeftMotorTotal() {
        return IsncsciTotals.getSummaryStringFor(this.leftUpperMotorTotal + this.leftLowerMotorTotal, this.leftUpperMotorTotalHasImpairmentNotDueToSci || this.leftLowerMotorTotalHasImpairmentNotDueToSci, this.leftUpperMotorContainsNt || this.leftLowerMotorContainsNt);
    }
    /**
     * Total from adding all left prick values.
    *
    * @return {string} The total produced by adding all left prick values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    getLeftPrickTotal() {
        return IsncsciTotals.getSummaryStringFor(this.leftPrickTotal, this.leftPrickTotalHasImpairmentNotDueToSci, this.leftPrickContainsNt);
    }
    /**
     * Total from adding all left touch values.
    *
    * @return {string} The total produced by adding all left touch values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    getLeftTouchTotal() {
        return IsncsciTotals.getSummaryStringFor(this.leftTouchTotal, this.leftTouchTotalHasImpairmentNotDueToSci, this.leftTouchContainsNt);
    }
    /**
     * Total from adding all left upper motor values.
    *
    * @return {string} The total produced by adding all left upper motor values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    getLeftUpperMotorTotal() {
        return IsncsciTotals.getSummaryStringFor(this.leftUpperMotorTotal, this.leftUpperMotorTotalHasImpairmentNotDueToSci, this.leftUpperMotorContainsNt);
    }
    /**
     * Total from adding all lower motor values.
    *
    * @return {string} The total produced by adding all lower motor values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    getLowerMotorTotal() {
        return IsncsciTotals.getSummaryStringFor(this.rightLowerMotorTotal + this.leftLowerMotorTotal, this.rightLowerMotorTotalHasImpairmentNotDueToSci || this.leftLowerMotorTotalHasImpairmentNotDueToSci, this.rightLowerMotorContainsNt || this.leftLowerMotorContainsNt);
    }
    /**
     * Total from adding all prick values.
    *
    * @return {string} The total produced by adding all prick values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    getPrickTotal() {
        return IsncsciTotals.getSummaryStringFor(this.rightPrickTotal + this.leftPrickTotal, this.rightPrickTotalHasImpairmentNotDueToSci || this.leftPrickTotalHasImpairmentNotDueToSci, this.rightPrickContainsNt || this.leftPrickContainsNt);
    }
    /**
     * Total from adding all right lower motor values.
    *
    * @return {string} The total produced by adding all right lower motor values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    getRightLowerMotorTotal() {
        return IsncsciTotals.getSummaryStringFor(this.rightLowerMotorTotal, this.rightLowerMotorTotalHasImpairmentNotDueToSci, this.rightLowerMotorContainsNt);
    }
    /**
     * Total from adding all right motor values.
    *
    * @return {string} The total produced by adding all right motor values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    getRightMotorTotal() {
        return IsncsciTotals.getSummaryStringFor(this.rightUpperMotorTotal + this.rightLowerMotorTotal, this.rightUpperMotorTotalHasImpairmentNotDueToSci || this.rightLowerMotorTotalHasImpairmentNotDueToSci, this.rightUpperMotorContainsNt || this.rightLowerMotorContainsNt);
    }
    /**
     * Total from adding all right prick values.
    *
    * @return {string} The total produced by adding all right prick values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    getRightPrickTotal() {
        return IsncsciTotals.getSummaryStringFor(this.rightPrickTotal, this.rightPrickTotalHasImpairmentNotDueToSci, this.rightPrickContainsNt);
    }
    /**
     * Total from adding all right touch values.
    *
    * @return {string} The total produced by adding all right touch values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    getRightTouchTotal() {
        return IsncsciTotals.getSummaryStringFor(this.rightTouchTotal, this.rightTouchTotalHasImpairmentNotDueToSci, this.rightTouchContainsNt);
    }
    /**
     * Total from adding all right upper motor values.
    *
    * @return {string} The total produced by adding all right upper motor values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    getRightUpperMotorTotal() {
        return IsncsciTotals.getSummaryStringFor(this.rightUpperMotorTotal, this.rightUpperMotorTotalHasImpairmentNotDueToSci, this.rightUpperMotorContainsNt);
    }
    /**
     * Total from adding all touch values.
    *
    * @return {string} The total produced by adding all touch values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    getTouchTotal() {
        return IsncsciTotals.getSummaryStringFor(this.rightTouchTotal + this.leftTouchTotal, this.rightTouchTotalHasImpairmentNotDueToSci || this.leftTouchTotalHasImpairmentNotDueToSci, this.rightTouchContainsNt || this.leftTouchContainsNt);
    }
    /**
     * Total from adding all upper motor values.
    *
    * @return {string} The total produced by adding all upper motor values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    getUpperMotorTotal() {
        return IsncsciTotals.getSummaryStringFor(this.rightUpperMotorTotal + this.leftUpperMotorTotal, this.rightUpperMotorTotalHasImpairmentNotDueToSci || this.leftUpperMotorTotalHasImpairmentNotDueToSci, this.rightUpperMotorContainsNt || this.leftUpperMotorContainsNt);
    }
}
IsncsciTotals.notDeterminable = 'UTD';
