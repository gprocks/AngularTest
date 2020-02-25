import {
  style,
  animate,
  animateChild,
  transition,
  trigger,
  query,
  stagger
} from "@angular/animations";
// const query = (s, a, o = { optional: true }) => q(s, a, o);

export const staggerItems = [
  // nice stagger effect when showing existing elements
  trigger("list", [
    transition(":enter", [
      // child animation selector + stagger
      query("@items", stagger(25, animateChild()))
    ])
  ]),
  trigger("items", [
    // cubic-bezier for a tiny bouncing feel
    transition(":enter", [
      style({ transform: "scale(0.5)", opacity: 0 }),
      animate(
        "1s cubic-bezier(.8,-0.6,0.2,1.5)",
        style({ transform: "scale(1)", opacity: 1 })
      )
    ])
  ])
];
