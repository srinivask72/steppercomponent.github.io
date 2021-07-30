import { r as registerInstance, e as createEvent, h } from './index-aaeb0bb5.js';

const stepperComponentCss = ":host{display:block}.stepper-wrapper{display:flex;justify-content:space-between;margin:20px}.steps-pending,.steps-completed{display:flex;justify-content:center}.stepper-item{position:relative;display:flex;flex-direction:column;align-items:center;flex:1;font-size:18px}.stepper-item::before{position:absolute;content:\"\";border-bottom:2px solid #969696;width:100%;top:20px;left:-50%;z-index:2}.stepper-item::after{position:absolute;content:\"\";border-bottom:2px solid #969696;width:100%;top:20px;left:50%;z-index:2}.stepper-item .step-counter{position:relative;z-index:5;display:flex;justify-content:center;align-items:center;width:40px;height:40px;border:2px solid #c6c6c6;border-radius:50%;background:#fff;color:#989898;font-weight:bold;font-size:18px;margin-bottom:6px;cursor:pointer}.stepper-item.active{font-weight:bold}.stepper-item.completed .step-counter,.stepper-item.active .step-counter{background-color:#39ac5d;border:2px solid #39ac5d;color:#fff}.stepper-item.completed::after{position:absolute;content:\"\";border-bottom:2px solid #39ac5d;width:100%;top:20px;left:50%;z-index:3}.stepper-item:first-child::before{content:none}.stepper-item:last-child::after{content:none}";

const StepperComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.stepClickHandlerCompleted = createEvent(this, "stepClickHandlerCompleted", 7);
  }
  stepClickCompletedHandler(event) {
    this.noOfPendingSteps = event.detail.filter(r => r.status === ' ').length;
    this.noOfCompletedSteps = event.detail.filter(r => r.status === 'completed ' || r.status === 'active ').length;
  }
  connectedCallback() {
    this.steps = JSON.parse(this.stepsObj);
  }
  onStepClickHandler(step) {
    const status = 'status';
    this.steps.map((res, i) => {
      if (i < (step - 1)) {
        res[status] = 'completed ';
      }
      else if (i === (step - 1)) {
        res[status] = 'active ';
      }
      else {
        res[status] = ' ';
      }
    });
    this.steps = [...this.steps];
    this.stepClickHandlerCompleted.emit(this.steps);
  }
  createSteps() {
    return this.steps.map((step, i) => {
      return (h("div", { class: 'stepper-item ' + (step.status ? step.status : ' '), onClick: () => this.onStepClickHandler(i + 1) }, h("div", { class: "step-counter" }, i + 1), h("div", { class: "step-name" }, step.stepName)));
    });
  }
  get pendingSteps() {
    return (this.noOfPendingSteps ? h("div", { class: "steps-pending" }, h("span", null, "No of pending Steps: ", this.noOfPendingSteps)) : '');
  }
  get completedSteps() {
    return (this.noOfCompletedSteps ? h("div", { class: "steps-completed" }, h("span", null, "No of completed Steps: ", this.noOfCompletedSteps)) : '');
  }
  render() {
    return (h("div", { class: "stepper-container" }, h("div", { class: "stepper-wrapper" }, this.createSteps()), this.pendingSteps, this.completedSteps));
  }
};
StepperComponent.style = stepperComponentCss;

export { StepperComponent as stepper_component };
