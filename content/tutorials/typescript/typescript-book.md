---
title: typescript-book
excerpt:  typescript-book
---

# The Concise TypeScript Book

The Concise TypeScript Book provides a comprehensive and succinct overview of TypeScript's capabilities. It offers clear explanations covering all aspects found in the latest version of the language, from its powerful type system to advanced features. Whether you're a beginner or an experienced developer, this book is an invaluable resource to enhance your understanding and proficiency in TypeScript.

This book is completely Free and Open Source.

## Translations

This book has been translated into several language versions, including:
https://github.com/gibbok/typescript-book/blob/main/README.md?plain=1
* [Chinese](./README-zh_CN.md)

## Downloads

You can also download the Epub version here:



## Table of content


- [The Concise TypeScript Book](#the-concise-typescript-book)
  - [Translations](#translations)
  - [Downloads](#downloads)
  - [Table of content](#table-of-content)
  - [Introduction](#introduction)
  - [About the author](#about-the-author)
  - [TypeScript an introduction](#typescript-an-introduction)
    - [What is TypeScript?](#what-is-typescript)
    - [Why TypeScript?](#why-typescript)
    - [TypeScript and JavaScript](#typescript-and-javascript)
    - [TypeScript code generation](#typescript-code-generation)
    - [Modern JavaScript Now (Downleveling)](#modern-javascript-now-downleveling)
  - [Getting Started With TypeScript](#getting-started-with-typescript)
    - [Installation](#installation)
    - [Configuration](#configuration)
    - [TypeScript configuration file ​​tsconfig.json](#typescript-configuration-file-tsconfigjson)
      - [target](#target)
      - [lib](#lib)
      - [strict](#strict)
      - [module](#module)
      - [moduleResolution](#moduleresolution)
      - [esModuleInterop](#esmoduleinterop)
      - [jsx](#jsx)
      - [skipLibCheck](#skiplibcheck)
      - [files](#files)
      - [include](#include)
      - [exclude](#exclude)
    - [Migration to TypeScript Advice](#migration-to-typescript-advice)
  - [Exploring the Type System](#exploring-the-type-system)
    - [The TypeScript language service](#the-typescript-language-service)
    - [Structural Typing](#structural-typing)
    - [TypeScript Fundamental Comparison Rules](#typescript-fundamental-comparison-rules)
    - [Types as sets](#types-as-sets)
    - [Assign a type: Type Declarations and Type Assertions](#assign-a-type-type-declarations-and-type-assertions)
      - [Type Declaration](#type-declaration)
      - [Type Assertion](#type-assertion)
      - [Non-null assertion](#non-null-assertion)
      - [Ambient Declarations](#ambient-declarations)
    - [Property Checking and Excess Property Checking](#property-checking-and-excess-property-checking)
    - [Weak Types](#weak-types)
    - [Strict Object Literal Checking (Freshness)](#strict-object-literal-checking-freshness)
    - [Type Inference](#type-inference)
    - [More advanced inferences](#more-advanced-inferences)
    - [Type Widening](#type-widening)
    - [Const](#const)
      - [const modifier on type parameters](#const-modifier-on-type-parameters)
    - [Explicit Type Annotation](#explicit-type-annotation)
    - [Const assertion](#const-assertion)
    - [Type Narrowing](#type-narrowing)
      - [Conditions](#conditions)
      - [Throwing or returning](#throwing-or-returning)
      - [Discriminated union](#discriminated-union)
      - [User-defined type guards](#user-defined-type-guards)
  - [Primitive Types](#primitive-types)
    - [string](#string)
    - [boolean](#boolean)
    - [number](#number)
    - [bigInt](#bigint)
    - [symbol](#symbol)
    - [null and undefined](#null-and-undefined)
    - [Array](#array)
    - [any](#any)
  - [Type Annotations](#type-annotations)
  - [Optional Properties](#optional-properties)
  - [Readonly Properties](#readonly-properties)
  - [Index Signatures](#index-signatures)
  - [Extending Types](#extending-types)
  - [Literal Types](#literal-types)
  - [Literal Inference](#literal-inference)
  - [strictNullChecks](#strictnullchecks)
  - [Non-null Assertion Operator (Postfix !)](#non-null-assertion-operator-postfix-)
  - [Enums](#enums)
    - [Numeric enums](#numeric-enums)
    - [String enums](#string-enums)
    - [Constant enums](#constant-enums)
    - [Reverse mapping](#reverse-mapping)
    - [Ambient enums](#ambient-enums)
    - [Computed and constant members](#computed-and-constant-members)
  - [Narrowing](#narrowing)
    - [typeof type guards](#typeof-type-guards)
    - [Truthiness narrowing](#truthiness-narrowing)
    - [Equality narrowing](#equality-narrowing)
    - [In operator narrowing](#in-operator-narrowing)
    - [instanceof narrowing](#instanceof-narrowing)
  - [Assignments](#assignments)
  - [Control flow analysis](#control-flow-analysis)
  - [type predicates](#type-predicates)
  - [Discriminated unions](#discriminated-unions)
  - [The never type](#the-never-type)
  - [Exhaustiveness checking](#exhaustiveness-checking)
  - [Object Types](#object-types)
  - [Tuple Type](#tuple-type)
  - [Fixed length tuple](#fixed-length-tuple)
  - [Union Type](#union-type)
  - [Intersection Types](#intersection-types)
  - [Type Indexing](#type-indexing)
  - [Type from Value](#type-from-value)
  - [Type from Func Return](#type-from-func-return)
  - [Type from Module](#type-from-module)
  - [Mapped types](#mapped-types)
  - [Conditional Types](#conditional-types)
  - [Distributive conditional types](#distributive-conditional-types)
  - [“infer” Type inference in conditional types](#infer-type-inference-in-conditional-types)
  - [Predefined conditional types](#predefined-conditional-types)
  - [Template Union Types](#template-union-types)
  - [Any type](#any-type)
  - [Unknown type](#unknown-type)
  - [Void type](#void-type)
  - [Never type](#never-type)
  - [Interface and Type](#interface-and-type)
    - [Common Syntax](#common-syntax)
    - [Basic types](#basic-types)
    - [Objects and interfaces](#objects-and-interfaces)
    - [Union and intersection types](#union-and-intersection-types)
  - [Built-in Type Primitives](#built-in-type-primitives)
  - [Common Built-in JS Objects](#common-built-in-js-objects)
  - [Overloads](#overloads)
  - [Get \& Set](#get--set)
  - [Merging and Extension](#merging-and-extension)
  - [Differences between Type and Interface](#differences-between-type-and-interface)
  - [Class](#class)
    - [Class Common Syntax](#class-common-syntax)
    - [Constructor](#constructor)
    - [Private and Protected Constructors](#private-and-protected-constructors)
    - [Access modifiers](#access-modifiers)
    - [Auto-Accessors in Classes](#auto-accessors-in-classes)
    - [this](#this)
    - [Parameter Properties](#parameter-properties)
    - [Abstract Classes](#abstract-classes)
    - [With Generics](#with-generics)
    - [Decorators](#decorators)
      - [Class decorators](#class-decorators)
      - [Property Decorator](#property-decorator)
      - [Method Decorator](#method-decorator)
      - [Getter and Setter Decorators](#getter-and-setter-decorators)
    - [Inheritance](#inheritance)
    - [Statics](#statics)
    - [Property initialization](#property-initialization)
    - [Method overloading](#method-overloading)
  - [Generics](#generics)
    - [Generic Type](#generic-type)
    - [Generic Classes](#generic-classes)
    - [Generic Constraints](#generic-constraints)
    - [Generic contextual narrowing](#generic-contextual-narrowing)
  - [Erased Structural Types](#erased-structural-types)
  - [Namespacing](#namespacing)
  - [Symbols](#symbols)
  - [Triple-Slash Directives](#triple-slash-directives)
  - [Type Manipulation](#type-manipulation)
    - [Creating Types from Types](#creating-types-from-types)
    - [Indexed Access Types](#indexed-access-types)
    - [Utility Types](#utility-types)
      - [Awaited\<T\>](#awaitedt)
      - [Partial\<T\>](#partialt)
      - [Required\<T\>](#requiredt)
      - [Readonly\<T\>](#readonlyt)
      - [Record\<K, T\>](#recordk-t)
      - [Pick\<T, K\>](#pickt-k)
      - [Omit\<T, K\>](#omitt-k)
      - [Exclude\<T, U\>](#excludet-u)
      - [Extract\<T, U\>](#extractt-u)
      - [NonNullable\<T\>](#nonnullablet)
      - [Parameters\<T\>](#parameterst)
      - [ConstructorParameters\<T\>](#constructorparameterst)
      - [ReturnType\<T\>](#returntypet)
      - [InstanceType\<T\>](#instancetypet)
      - [ThisParameterType\<T\>](#thisparametertypet)
      - [OmitThisParameter\<T\>](#omitthisparametert)
      - [ThisType\<T\>](#thistypet)
      - [Uppercase\<T\>](#uppercaset)
      - [Lowercase\<T\>](#lowercaset)
      - [Capitalize\<T\>](#capitalizet)
      - [Uncapitalize\<T\>](#uncapitalizet)
  - [Others](#others)
    - [Errors and Exception Handling](#errors-and-exception-handling)
    - [Asynchronous Language Features](#asynchronous-language-features)
    - [Iterators and Generators](#iterators-and-generators)
    - [TsDocs JSDoc Reference](#tsdocs-jsdoc-reference)
    - [@types](#types)
    - [JSX](#jsx-1)
    - [ES6 Modules](#es6-modules)
    - [ES7 exponentiation operator](#es7-exponentiation-operator)
    - [The for-await-of Statement](#the-for-await-of-statement)
    - [New.target](#newtarget)
    - [Dynamic Import Expressions](#dynamic-import-expressions)
    - [“tsc –watch”](#tsc-watch)
    - [Definite Assignment Assertions (!)](#definite-assignment-assertions-)
    - [Defaulted declarations](#defaulted-declarations)
    - [“const“ assertions](#const-assertions)
    - [Optional Chaining](#optional-chaining)
    - [Nullish coalescing operator (??)](#nullish-coalescing-operator-)
    - [Template Literal Types](#template-literal-types)
    - [Function overloading](#function-overloading)
    - [Recursive Conditional Types](#recursive-conditional-types)
    - [ECMAScript Module Support in Node.js](#ecmascript-module-support-in-nodejs)
    - [Assertion Functions](#assertion-functions)
    - [Variadic Tuple Types](#variadic-tuple-types)
    - [Boxed types](#boxed-types)
    - [Key Remapping in Mapped Types](#key-remapping-in-mapped-types)
    - [Covariance and Contravariance in TypeScript](#covariance-and-contravariance-in-typescript)
      - [Optional Variance Annotations for Type Parameters](#optional-variance-annotations-for-type-parameters)
    - [Symbol and Template String Pattern Index Signatures](#symbol-and-template-string-pattern-index-signatures)
    - [The satisfies Operator](#the-satisfies-operator)

## Introduction

Welcome to The Concise TypeScript Book! This guide equips you with essential knowledge and practical skills for effective TypeScript development. Discover key concepts and techniques to write clean, robust code. Whether you're a beginner or an experienced developer, this book serves as both a comprehensive guide and a handy reference for leveraging TypeScript's power in your projects.

## About the author

Simone Poggiali is an experienced Senior Front-end Developer with a passion for writing professional-grade code since the 90s. Throughout his international career, he has contributed to numerous projects for a wide range of clients, from startups to large organizations. Notable companies such as HelloFresh, Siemens, O2, and Leroy Merlin have benefited from his expertise and dedication.

You can reach Simone Poggiali on the following platforms:


 
```typescript
interface Animal {
    name: string;
}
interface Dog extends Animal {
    bark: () => void;
}
interface Cat extends Animal {
    meow: () => void;
}
const makeNoise = (animal: Animal) => {
    if (animal instanceof Dog) {
 
    }
};
```