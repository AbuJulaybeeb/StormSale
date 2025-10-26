import { cn } from "../../lib/utils";

interface InputGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({ children, className }) => {
  function cn(arg0: string, className: string | undefined): string | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <div className={cn("space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900 shadow-lg", className)}>
      {children}
    </div>
  );
};

interface InputFieldProps {
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  description, 
  error, 
  required, 
  children, 
  className 
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      
      {children}
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <span>⚠</span>
          {error}
        </p>
      )}
    </div>
  );
};