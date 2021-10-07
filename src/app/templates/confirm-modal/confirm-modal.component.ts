import {ComponentModalConfig, ModalSize, SuiModal} from 'ng2-semantic-ui';
import {Component} from '@angular/core';

interface IConfirmModalContext {
    title: string;
    question: string;
}

@Component({
    selector: 'app-confirm-modal',
    template: `<div class="header">
            {{ modal.context.title }}
        <label class="ui bg-white huge top right attached label " (click)="modal.deny(undefined)"><i class="ui x link icon"></i>
            </label>
        </div>
        <div class="content">
            <p>{{ modal.context.question }}</p>
        </div>
        <div class="actions">
            <button class="ui red button" (click)="modal.approve(undefined)" autofocus>Yes</button>
            <button class="ui gray button" (click)="modal.deny(undefined)">Cancel</button>
        </div>`
})
export class ConfirmModalComponent {
    constructor(public modal: SuiModal<IConfirmModalContext, void, void>) {}
}
export class ConfirmModal extends ComponentModalConfig<IConfirmModalContext, void, void> {
    constructor(title: string, question: string, size = ModalSize.Mini) {
        super(ConfirmModalComponent, { title, question });

        this.isClosable = false;
        this.transitionDuration = 150;
        this.size = size;
    }
}
