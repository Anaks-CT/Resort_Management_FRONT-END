export const setApiHeader = (token: string) => {
    return {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
  };