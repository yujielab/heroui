"use client";

import type {InputProps, SelectProps} from "@heroui/react";

import React from "react";
import {
  Input,
  Avatar,
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  Checkbox,
  Link,
  Tabs,
  Tab,
} from "@heroui/react";
import {Icon} from "@iconify/react";
import {cn} from "@heroui/react";

import countries, {type countryProp} from "./countries";
import states from "./states";

export type ReviewAndPaymentFormProps = React.HTMLAttributes<HTMLFormElement>;

const ReviewAndPaymentForm = React.forwardRef<HTMLFormElement, ReviewAndPaymentFormProps>(
  ({className, ...props}, ref) => {
    const appearanceNoneClassName =
      "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

    const inputProps: Pick<InputProps, "labelPlacement" | "classNames"> = {
      labelPlacement: "outside",
      classNames: {
        label:
          "text-small font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
      },
    };

    const numberInputProps: Pick<InputProps, "labelPlacement" | "classNames"> = {
      labelPlacement: "outside",
      classNames: {
        label:
          "text-small font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
        input: appearanceNoneClassName,
      },
    };

    const selectProps: Pick<SelectProps, "labelPlacement" | "classNames"> = {
      labelPlacement: "outside",
      classNames: {
        label: "text-small font-medium text-default-700 group-data-[filled=true]:text-default-700",
      },
    };

    const NumberInput = ({className, ...props}: React.InputHTMLAttributes<HTMLInputElement>) => (
      <input
        className={cn(
          "rounded-sm bg-transparent text-sm text-default-foreground",
          className,
          appearanceNoneClassName,
        )}
        min={0}
        minLength={0}
        type="number"
        {...props}
      />
    );

    return (
      <>
        <div className="text-3xl font-bold leading-9 text-default-foreground">Review & Payment</div>
        <div className="py-4 text-base leading-5 text-default-500">You are almost done 🎉</div>
        <form
          ref={ref}
          className={cn("flex grid grid-cols-12 flex-col gap-4 py-8", className)}
          {...props}
        >
          <Tabs
            className="col-span-12"
            classNames={{
              cursor: "group-data-[selected=true]:bg-content1",
            }}
          >
            <Tab key="one-time-payment" title="One-time Payment" />
            <Tab key="subscription" title="Subscription" />
          </Tabs>

          <Input
            className="col-span-12"
            label="Email Address"
            name="email"
            placeholder="john.doe@acme.com"
            type="email"
            {...inputProps}
          />
          <Input
            className="col-span-12 rounded-sm bg-transparent text-sm text-default-500 md:col-span-6"
            endContent={
              <div className="flex items-center">
                <NumberInput
                  className="w-7"
                  max={12}
                  maxLength={2}
                  name="card-month"
                  placeholder="MM"
                />
                <span className="mx-[2px] text-default-500">/</span>
                <NumberInput
                  className="w-7"
                  max={99}
                  maxLength={2}
                  name="card-year"
                  placeholder="YY"
                />
                <NumberInput
                  className="ml-2"
                  max={999}
                  maxLength={3}
                  name="card-cvc"
                  placeholder="CVC"
                />
              </div>
            }
            label="Card number"
            minLength={0}
            name="card-number"
            placeholder="Card number"
            startContent={
              <span>
                <Icon className="text-default-400" icon="solar:card-bold" width={24} />
              </span>
            }
            type="number"
            {...numberInputProps}
          />

          <Input
            className="col-span-12 md:col-span-6"
            label="Entity Ending"
            name="entity-name"
            placeholder="Inc."
            {...inputProps}
          />

          <Select
            className="col-span-12"
            label="Cardholder name"
            name="cardholder-name"
            placeholder="John Doe"
            {...selectProps}
          >
            <SelectItem key="key1" value="john-doe">
              John Doe
            </SelectItem>
            <SelectItem key="key1" value="eva-e-isaacson">
              Eva E. Isaacson
            </SelectItem>
            <SelectItem key="key1" value="connie-d-voss">
              Connie D. Voss
            </SelectItem>
          </Select>

          <Autocomplete
            className="col-span-12"
            defaultItems={countries}
            inputProps={{
              classNames: inputProps.classNames,
            }}
            label="Country"
            labelPlacement="outside"
            name="country"
            placeholder="Select country"
            showScrollIndicators={false}
          >
            {(item: countryProp) => (
              <AutocompleteItem
                key={item.code}
                startContent={
                  <Avatar
                    alt="Country Flag"
                    className="h-6 w-6"
                    src={`https://flagcdn.com/${item.code.toLowerCase()}.svg`}
                  />
                }
                value={item.code}
              >
                {item.name}
              </AutocompleteItem>
            )}
          </Autocomplete>

          <Input
            className="col-span-12 md:col-span-6"
            label="Zip Code"
            name="zip-code"
            placeholder="Zip Code"
            {...inputProps}
          />

          <Select
            className="col-span-12 md:col-span-6"
            items={states}
            label="State"
            name="state"
            placeholder="State"
            {...selectProps}
          >
            {(registrationState) => (
              <SelectItem key={registrationState.value}>{registrationState.title}</SelectItem>
            )}
          </Select>

          <Checkbox
            defaultSelected
            className="col-span-12 m-0 p-2 text-left"
            color="secondary"
            name="terms-and-privacy"
            size="md"
          >
            I read and agree with the
            <Link className="mx-1 text-secondary underline" href="#" size="md">
              Terms
            </Link>
            <span>and</span>
            <Link className="ml-1 text-secondary underline" href="#" size="md">
              Privacy Policy
            </Link>
            .
          </Checkbox>
        </form>
      </>
    );
  },
);

ReviewAndPaymentForm.displayName = "ReviewAndPaymentForm";

export default ReviewAndPaymentForm;
