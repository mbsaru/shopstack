"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Example field config (from UI config):
// {
//   name: "confirmPassword",
//   label: "Confirm Password",
//   type: "password",
//   required: true,
//   validations: { match: "password" }
// }

export function FormRenderer({
  fields = [],
  onSubmitAction,
  dispatchAction,
  title,
  subtitle,
  submitButtonText = "Submit"
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm();

  const formValues = watch();

  const buildValidationRules = (field) => {
    const rules = {};

    if (field.required) {
      rules.required = `${field.label || field.name} is required`;
    }
    if (field.validations) {
      if (field.validations.minLength) {
        rules.minLength = {
          value: field.validations.minLength,
          message: `${field.label} must be at least ${field.validations.minLength} characters`
        };
      }
      if (field.validations.maxLength) {
        rules.maxLength = {
          value: field.validations.maxLength,
          message: `${field.label} must be at most ${field.validations.maxLength} characters`
        };
      }
      if (field.validations.pattern) {
        rules.pattern = {
          value: new RegExp(field.validations.pattern),
          message: `Invalid ${field.label}`
        };
      }
      if (field.validations.match) {
        rules.validate = (value) =>
          value === formValues[field.validations.match] ||
          `${field.label} must match ${field.validations.match}`;
      }
    }

    return rules;
  };

  const onSubmit = async (data) => {
    if (!onSubmitAction || !dispatchAction) {
      console.error(
        "FormRenderer: onSubmitAction or dispatchAction prop is missing."
      );
      return;
    }

    const pageContext = { form: data };

    try {
      await dispatchAction(
        onSubmitAction.action,
        onSubmitAction.payload,
        pageContext
      );
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="space-y-4">
      {title && (
        <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-gray-600 mb-6 text-center">{subtitle}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="space-y-1">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              type={field.type}
              id={field.name}
              {...register(field.name, buildValidationRules(field))}
              className={errors[field.name] ? "border-red-500" : ""}
            />
            {errors[field.name] && (
              <p className="text-sm text-red-500 mt-1">
                {errors[field.name].message}
              </p>
            )}
          </div>
        ))}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : submitButtonText}
        </Button>
      </form>
    </div>
  );
}
