use candid::{CandidType, Deserialize};
use ic_cdk_macros::{query, update};
use std::cell::RefCell;

#[derive(CandidType, Deserialize, Default)]
struct Counter {
    value: i32,
}

thread_local! {
    static COUNTER: RefCell<Counter> = RefCell::new(Counter::default());
}

#[update]
fn increment() {
    COUNTER.with(|counter| {
        counter.borrow_mut().value += 1;
    });
}

#[update]
fn decrement() {
    COUNTER.with(|counter| {
        counter.borrow_mut().value -= 1;
    });
}

#[query]
fn get_value() -> i32 {
    COUNTER.with(|counter| counter.borrow().value)
}
