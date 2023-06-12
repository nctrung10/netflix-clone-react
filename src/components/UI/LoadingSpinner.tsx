import classes from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={classes.layout}>
      <div className={classes.loader}></div>
    </div>
  );
};

export default LoadingSpinner;