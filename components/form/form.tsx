import styles from './form.module.scss'

interface FormProps {
  method: "POST" | "GET",
  title?: string,
  errorStack?: Array<string>,
  children: React.ReactNode,
}

export default function Form({ method, title, errorStack=[], children }: FormProps) {
  return (
    <form method={method} className={styles.form}>
      {
        title
          ? <h3 className="h3">{title}</h3>
          : <></>
      }
      {
        errorStack.length > 0
          ? <ErrorBar
            errorStack={errorStack}
          />
          : <></>
      }
      { children }
    </form>
  )
}

function ErrorBar({ errorStack }: { errorStack: Array<string> }) {
  return (
    <div className={styles.errorbar}>
      <ul className={styles.errorList}>
        {
          errorStack.map(err => (
            <li key={err}>{err}</li>
          ))
        }
      </ul>
    </div>
  )
}