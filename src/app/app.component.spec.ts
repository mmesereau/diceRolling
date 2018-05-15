import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [FormsModule]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Roll the Dice'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Roll the Dice');
  }));
  it(`should have dice size options`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.dice_options).toContain(4);
    expect(app.dice_options).toContain(6);
    expect(app.dice_options).toContain(8);
    expect(app.dice_options).toContain(12);
    expect(app.dice_options).toContain(20);
  }));
  it(`should have a default dice size as 6`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.size_of_dice).toEqual(6);
  }));
  it(`should have a default number of dice as 2`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.number_of_dice).toEqual(2);
  }));
  it(`should have a default weights length of 6`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.weights.length).toEqual(6);
  }));
  it(`should have a animate selection as true`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.animate).toEqual(true);
  }));
  it(`should change the weights length when dice size is increased`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.size_of_dice = 8;
    app.changeSize();
    expect(app.weights.length).toEqual(8);
  }));
  it(`should change the weights length when dice size is decreased`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.size_of_dice = 30;
    app.changeSize();
    app.size_of_dice = 6;
    app.changeSize();
    expect(app.weights.length).toEqual(6);
  }));
  it(`should change preserve existing non-default weights if within new dice size on size change`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.weights[0].weight = 4;
    app.size_of_dice = 8;
    app.changeSize();
    expect(app.weights[0].weight).toEqual(4);
  }));
  it(`should roll the correct number of dice`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.number_of_dice = 5;
    app.animate = false;
    app.roll();
    expect(app.dice.length).toEqual(5);
  }));
  it(`should always show outcomes as integers`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    //large enough to expect every outcome enough times
    app.number_of_dice = 75;
    app.roll();
    for (var i = 0; i < app.dice.length; i++) {
      expect(typeof app.dice[i].value).toEqual('number');
      expect(app.dice[i].value).toEqual(Math.floor(app.dice[i].value));
    }
  }));
  it(`should always show outcomes between 0 and the size of the dice`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.number_of_dice = 75;
    //random dice size within acceptable parameters
    app.size_of_dice = app.dice_options[Math.floor(Math.random() * app.dice_options.length)]
    app.roll();
    for (var i = 0; i < app.dice.length; i++) {
      //not greater than <=> less than or equal to
      expect(app.dice[i].value).not.toBeGreaterThan(app.size_of_dice);
      expect(app.dice[i].value).toBeGreaterThan(0);
    }
  }));
  it(`should assign values according to weights`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    //keep weight of one for outcome 1 (weights index 0); desired outcome is that each roll will be one
    for (var i = 1; i < app.weights.length; i++) {
      app.weights[i].weight = 0;
    }
    app.number_of_dice = 75;
    app.roll();
    for (i = 0; i < app.dice.length; i++) {
      expect(app.dice[i].value).toEqual(1);
    }
  }));
  it(`should allow for all outcomes if all weights are set to zero`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    //all weights set to zero
    for (var i = 0; i < app.weights.length; i++) {
      app.weights[i].weight = 0;
    }
    app.number_of_dice = 75;
    app.animate = false;
    app.roll();
    var values = [];
    for (i = 0; i < app.dice.length; i++) {
      if (!values.includes(app.dice[i].value)) {
        values.push(app.dice[i].value);
      }
    }
    for (i = 1; i <= app.size_of_dice; i++) {
      expect(values).toContain(i);
    }
  }));
  it(`should set all weights to 1 if cheating is disabled`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.weights[2].weight = 3;
    app.cheat = true;
    app.toggleCheating();
    expect(app.weights[2].weight).toEqual(1);
  }));
  it(`should validate non-numbers, non-positives, and non-integers for number of dice`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.number_of_dice = "hello";
    app.validateNumberOfDice();
    expect(app.number_of_dice).toEqual(1);
    app.number_of_dice = -5;
    app.validateNumberOfDice();
    expect(app.number_of_dice).toEqual(5);
    app.number_of_dice = 1.9;
    app.validateNumberOfDice();
    expect(app.number_of_dice).toEqual(19);
  }));
  it(`should allow a maximum of 24 dice`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.number_of_dice = 50;
    app.validateNumberOfDice();
    expect(app.number_of_dice).toEqual(24);
  }));
});
