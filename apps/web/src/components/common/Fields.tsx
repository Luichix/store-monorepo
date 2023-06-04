import React, { SelectHTMLAttributes, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

const formClasses =
  'block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm';

function Label({ id, children }) {
  return (
    <label
      htmlFor={id}
      className="mb-2 block text-sm font-semibold text-gray-900"
    >
      {children}
    </label>
  );
}

type TextFieldProps = {
  id: string;
  label?: string;
  type?: string;
  className?: string;
};

export function TextField({
  id,
  label,
  type = 'text',
  className,
  ...props
}: TextFieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={formClasses} />
    </div>
  );
}

type SelectFieldProps = {
  id: string;
  label?: string;
  className?: string;
};

export function SelectField({
  id,
  label,
  className,
  ...props
}: SelectFieldProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select id={id} {...props} className={clsx(formClasses, 'pr-8')} />
    </div>
  );
}
