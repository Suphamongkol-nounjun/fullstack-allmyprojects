export const reloadpage = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };