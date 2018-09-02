/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input {
    import SoftTextDialogInputListener = com.jme3.input.controls.SoftTextDialogInputListener;

    export interface SoftTextDialogInput {
        requestDialog(id : number, title : string, initialValue : string, listener : SoftTextDialogInputListener);
    }

    export namespace SoftTextDialogInput {

        export let TEXT_ENTRY_DIALOG : number = 0;

        export let NUMERIC_ENTRY_DIALOG : number = 1;

        export let NUMERIC_KEYPAD_DIALOG : number = 2;
    }

}

