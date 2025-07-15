export const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-16 h-16'
};

export const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-2xl'
};

export const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl'
};

export const sizeValue = {
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
    XL: 'xl'
} as const;

export const AvatarShape = {
    CIRCLE: 'circle',
    SQUARE: 'square'
} as const;

export const ButtonSize = {
    XS: 'xs',
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
    XL: 'xl'
} as const;

export const ButtonStyle = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    GREEN_SUCCESS: 'greenSuccess',
    ORANGE_WARNING: 'orangeWarning',
    RED_DANGER: 'redDanger',
    GHOST: 'ghost',
    OUTLINE: 'outline',
    SUBMIT: 'submit',
    TEXT: 'text'
} as const;

export const timeOptions = Array.from({ length: 24 }, (_, h) => {
	return ['00', '15', '30', '45'].map((m) => `${h.toString().padStart(2, '0')}:${m}`);
}).flat();

export const sizeConfig = {
    xs: {
        base: 'p-1.5 text-xs',
        icon: 'w-6 h-6',
        iconSpacing: 'space-x-1.5'
    },
    sm: {
        base: 'px-3 py-2 text-sm',
        icon: 'w-4 h-4', 
        iconSpacing: 'space-x-2'
    },
    md: {
        base: 'px-4 py-2.5 text-sm',
        icon: 'w-5 h-5',
        iconSpacing: 'space-x-2.5'
    },
    lg: {
        base: 'px-6 py-3 text-base',
        icon: 'w-5 h-5',
        iconSpacing: 'space-x-3'
    },
    xl: {
        base: 'px-8 py-4 text-lg',
        icon: 'w-6 h-6',
        iconSpacing: 'space-x-3'
    }
};

export const variantConfig = {
    primary: {
        normal: 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 text-white shadow-md hover:shadow-lg',
        disabled: 'bg-primary-300 text-primary-100 cursor-not-allowed',
        loading: 'bg-primary-600 text-white cursor-wait'
    },
    secondary: {
        normal: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white shadow-md hover:shadow-lg',
        disabled: 'bg-gray-300 dark:bg-gray-600 text-gray-100 dark:text-gray-400 cursor-not-allowed',
        loading: 'bg-gray-600 text-white cursor-wait'
    },
    greenSuccess: {
        normal: 'bg-success-600 hover:bg-success-700 focus:ring-success-500 text-white shadow-md hover:shadow-lg',
        disabled: 'bg-success-300 text-success-100 cursor-not-allowed',
        loading: 'bg-success-600 text-white cursor-wait'
    },
    orangeWarning: {
        normal: 'bg-warning-600 hover:bg-warning-700 focus:ring-warning-500 text-white shadow-md hover:shadow-lg',
        disabled: 'bg-warning-300 text-warning-100 cursor-not-allowed',
        loading: 'bg-warning-600 text-white cursor-wait'
    },
    redDanger: {
        normal: 'bg-error-600 hover:bg-error-700 focus:ring-error-500 text-white shadow-md hover:shadow-lg',
        disabled: 'bg-error-300 text-error-100 cursor-not-allowed',
        loading: 'bg-error-600 text-white cursor-wait'
    },
    ghost: {
        normal: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500 text-gray-700 dark:text-gray-300',
        disabled: 'bg-transparent text-gray-400 dark:text-gray-600 cursor-not-allowed',
        loading: 'bg-transparent text-gray-700 dark:text-gray-300 cursor-wait'
    },
    outline: {
        normal: 'bg-transparent border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 focus:ring-gray-500 text-gray-700 dark:text-gray-300',
        disabled: 'bg-transparent border-2 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed',
        loading: 'bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 cursor-wait'
    },
    submit: {
        normal: 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 text-white shadow-md hover:shadow-lg',
        disabled: 'bg-primary-300 text-primary-100 cursor-not-allowed',
        loading: 'bg-primary-600 text-white cursor-wait'
    }
};

export const positionClasses = {
    'top-right': 'fixed top-4 right-4 z-50',
    'top-center': 'fixed top-4 left-1/2 -translate-x-1/2 z-50',
    inline: 'relative w-full'
};

export const feedbackTypeConfig = {
    success: {
        icon: 'CheckCircle',
        bgClass: 'bg-success-50 dark:bg-success-900/20',
        borderClass: 'border-success-200 dark:border-success-700/50',
        iconColor: 'success',
        textClass: 'text-success-800 dark:text-success-200',
        titleClass: 'text-success-900 dark:text-success-100',
        defaultTitle: 'Succès'
    },
    error: {
        icon: 'XCircle',
        bgClass: 'bg-error-50 dark:bg-error-900/20',
        borderClass: 'border-error-200 dark:border-error-700/50',
        iconColor: 'error',
        textClass: 'text-error-800 dark:text-error-200',
        titleClass: 'text-error-900 dark:text-error-100',
        defaultTitle: 'Erreur'
    },
    warning: {
        icon: 'ExclamationTriangle',
        bgClass: 'bg-warning-50 dark:bg-warning-900/20',
        borderClass: 'border-warning-200 dark:border-warning-700/50',
        iconColor: 'warning',
        textClass: 'text-warning-800 dark:text-warning-200',
        titleClass: 'text-warning-900 dark:text-warning-100',
        defaultTitle: 'Attention'
    },
    info: {
        icon: 'InformationCircle',
        bgClass: 'bg-info-50 dark:bg-info-900/20',
        borderClass: 'border-info-200 dark:border-info-700/50',
        iconColor: 'info',
        textClass: 'text-info-800 dark:text-info-200',
        titleClass: 'text-info-900 dark:text-info-100',
        defaultTitle: 'Information'
    }
} as const;

export const FEEDBACK_TYPE_SUCCESS = 'success';
export const FEEDBACK_TYPE_ERROR = 'error';

export const componentVisualStyles = {
    sm: {
        wrapper: 'w-8 h-8 rounded-lg',
        text: 'text-base',
        pulse: 'w-2.5 h-2.5 -top-0.5 -right-0.5',
        title: 'text-lg',
        subtitle: 'text-xs'
    },
    md: {
        wrapper: 'w-10 h-10 rounded-2xl',
        text: 'text-lg',
        pulse: 'w-3 h-3 -top-1 -right-1',
        title: 'text-xl',
        subtitle: 'text-xs'
    },
    lg: {
        wrapper: 'w-14 h-14 rounded-2xl',
        text: 'text-2xl',
        pulse: 'w-3.5 h-3.5 -top-1 -right-1',
        title: 'text-2xl',
        subtitle: 'text-sm'
    },
    xl: {
        wrapper: 'w-20 h-20 rounded-3xl',
        text: 'text-4xl',
        pulse: 'w-4 h-4 -top-1.5 -right-1.5',
        title: 'text-4xl',
        subtitle: 'text-base'
    }
} as const;


export const colors = {
    default: 'text-gray-600 dark:text-gray-400',
    primary: 'text-primary-600 dark:text-primary-400',
    success: 'text-success-600 dark:text-success-400',
    warning: 'text-warning-600 dark:text-warning-400',
    error: 'text-error-600 dark:text-error-400',
    info: 'text-info-600 dark:text-info-400',
    action: 'text-action-600 dark:text-action-400'
};

export const badgeColorClasses: Record<string, string> = {
    primary: 'bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-700/50 text-primary-700 dark:text-primary-300',
    success: 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 text-green-700 dark:text-green-300',
    purple: 'bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700/50 text-purple-700 dark:text-purple-300',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/50 text-emerald-700 dark:text-emerald-300',
    blue: 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/50 text-blue-700 dark:text-blue-300'
};

export const sizeClasses3 = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
};

export const colorClasses = {
    primary: 'border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400',
    white: 'border-white/30 border-t-white',
    gray: 'border-gray-200 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-400'
};



export const colorClasses2 = {
    green:
        'border-green-500 bg-green-50 dark:bg-green-900/20 hover:border-green-300 dark:hover:border-green-500',
    orange:
        'border-orange-500 bg-orange-50 dark:bg-orange-900/20 hover:border-orange-300 dark:hover:border-orange-500',
    blue: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500',
    purple:
        'border-purple-500 bg-purple-50 dark:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-500'
};