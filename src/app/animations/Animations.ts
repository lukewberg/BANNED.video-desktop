// import the required animation functions from the angular animations module
import { trigger, state, animate, transition, style } from '@angular/animations';

export function slideInOutAnimation() {
    return slideToLeft;
}

function slideToLeft() {
    return trigger('routerTransition', [
        state('void', style({ position: 'fixed', width: '100%' })),
        state('*', style({ position: 'fixed', width: '100%' })),
        transition(':enter', [  // before 2.1: transition('void => *', [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [  // before 2.1: transition('* => void', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ])
    ]);
}

export function fadeInOut() {
    return trigger('simpleFadeAnimation', [

        // the "in" style determines the "resting" state of the element when it is visible.
        state('in', style({ opacity: 1 })),

        // fade in when created. this could also be written as transition('void => *')
        transition(':enter', [
            style({ opacity: 0 }),
            animate(600)
        ]),

        // fade out when destroyed. this could also be written as transition('void => *')
        transition(':leave',
            animate(600, style({ opacity: 0 })))
    ]);
}

export function slideInRight() {
    return trigger('slideInRightAnimation', [

        state('in', style({})),

        transition(':enter', [
            style({position: 'absolute', right: '-100%'}),
            animate('.8s .5s cubic-bezier(0.86, 0, 0.07, 1)')
        ]),

        transition(':leave',
            animate(500, style({ position: 'absolute', right: '-100%' })))
    ]);
}
