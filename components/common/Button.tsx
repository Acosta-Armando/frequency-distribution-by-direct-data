import React, { Children, FC, PropsWithChildren } from 'react'

interface ButtonProps extends PropsWithChildren {
  type: 'button' | 'reset'
  className?: string
  onClick: () => void
}

const Button: FC<ButtonProps> = ({ children, type, className, onClick }) => {
  const buttonColor = type === 'button' ? 'bg-tertiary' : 'bg-error'
  return (
    <button
      className={`px-6 h-9 w-fit flex items-center justify-center rounded-xl hover:opacity-70 ${buttonColor} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
