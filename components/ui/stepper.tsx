'use client';

import { cn } from '@/lib/utils';
import { Check, ChevronRight } from 'lucide-react';

type Step = {
  id: string;
  label: string;
  description?: string;
};

type StepperProps = {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
};

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="w-full">
      {/* Desktop: Horizontal stepper */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step circle */}
              <button
                onClick={() => onStepClick?.(index)}
                disabled={index > currentStep}
                className={cn(
                  'relative z-10 flex items-center justify-center w-12 h-12 rounded-full font-bold text-sm transition-all duration-300',
                  'disabled:cursor-not-allowed',
                  index < currentStep
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/40'
                    : index === currentStep
                      ? 'bg-linear-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50 ring-4 ring-green-200'
                      : 'bg-gray-200 text-gray-600'
                )}
              >
                {index < currentStep ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </button>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-3 relative">
                  <div className="absolute inset-0 bg-gray-200 rounded-full" />
                  <div
                    className={cn(
                      'absolute inset-0 rounded-full transition-all duration-500',
                      index < currentStep
                        ? 'bg-linear-to-r from-green-500 to-emerald-500 w-full'
                        : 'bg-gray-200 w-0'
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Step labels */}
        <div className="flex items-center justify-between mt-4">
          {steps.map((step) => (
            <div key={step.id} className="flex-1 text-center">
              <p className="text-sm font-semibold text-gray-900">{step.label}</p>
              {step.description && (
                <p className="text-xs text-gray-500 mt-1">{step.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Vertical stepper */}
      <div className="md:hidden">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-4">
              {/* Step circle */}
              <div
                className={cn(
                  'relative z-10 flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm shrink-0 transition-all duration-300',
                  index < currentStep
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/40'
                    : index === currentStep
                      ? 'bg-linear-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50 ring-4 ring-green-200'
                      : 'bg-gray-200 text-gray-600'
                )}
              >
                {index < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Step content */}
              <div className="flex-1 pt-1">
                <p className={cn('text-sm font-semibold', index === currentStep ? 'text-gray-900' : 'text-gray-600')}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                )}
              </div>

              {/* Vertical connector */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'absolute left-5 top-12 w-0.5 h-12 transition-all duration-500',
                    index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-6 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-green-500 to-emerald-500 transition-all duration-500"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
