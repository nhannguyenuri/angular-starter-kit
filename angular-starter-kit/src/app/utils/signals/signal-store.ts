export type SignalStoreItem = {
  key: string;
  value: {
    [k: string]: any;
    id: string;
  };
  settings: {
    [k: string]: any;
  };
  metadata: {
    [k: string]: any;
    data: any;
  };
};

export type SignalStore = {
  (): Map<string, SignalStoreItem>;
  add(item: SignalStoreItem): SignalStoreStatus<SignalStoreItem>;
  update(item: SignalStoreItem): SignalStoreStatus<SignalStoreItem>;
  get(id: string): SignalStoreStatus<SignalStoreItem>;
  delete(id: string): SignalStoreStatus<string>;
  removeAll(): SignalStoreStatus<string[]>;
  generateId(item: SignalStoreItem): SignalStoreStatus<string>;
  toArray(item: SignalStoreItem): SignalStoreStatus<SignalStoreItem & any[]>;
};

export type SignalStoreStatus<T> = {
  success?: boolean;
  data?: T;
  error?: boolean;
  message?: any;
};

/**
 * 
 * @example
 * useSignalStore.add({
		key,
		value: {
			id: '',
		},
		settings: { },
		metadata: {
			data,
		}
	})
 */
export const useSignalStore = (options = {}) => {
  const store = new Map<string, SignalStoreItem>();

  const getStore = () => {
    return store;
  };

  getStore.add = (
    item: SignalStoreItem,
  ): SignalStoreStatus<SignalStoreItem> => {
    if (!item) {
      return {
        error: true,
        message: 'Invalid store item',
      };
    }

    const id = getStore.generateId(item)?.data;
    if (!id) {
      return {
        error: true,
        message: 'Invalid store item',
      };
    }

    item.value.id = id;

    store.set(id, item);

    return {
      success: true,
      data: item,
    };
  };

  getStore.update = (
    item: SignalStoreItem,
  ): SignalStoreStatus<SignalStoreItem> => {
    if (store.size === 0) {
      return {
        error: true,
        message: 'Store is empty',
      };
    }

    if (!item) {
      return {
        error: true,
        message: 'Invalid store item',
      };
    }

    if (!store.has(item.value.id)) {
      return {
        error: true,
        message: 'Invalid store item does not exist',
      };
    }

    const { id } = item.value;

    store.set(id, item);

    return {
      success: true,
      data: item,
    };
  };

  getStore.get = (id: string): SignalStoreStatus<SignalStoreItem> => {
    if (store.size === 0) {
      return {
        error: true,
        message: 'Store is empty',
      };
    }

    if (!id) {
      return {
        error: true,
        message: 'Invalid id',
      };
    }

    return {
      success: true,
      data: store.get(id),
    };
  };

  getStore.delete = (id: string): SignalStoreStatus<string> => {
    if (store.size === 0) {
      return {
        error: true,
        message: 'Store is empty',
      };
    }

    if (!id) {
      return {
        error: true,
        message: 'Invalid id',
      };
    }

    if (!store.has(id)) {
      return {
        error: true,
        message: 'Invalid store item does not exist',
      };
    }

    store.delete(id);

    return {
      success: true,
      data: id,
    };
  };

  getStore.removeAll = (): SignalStoreStatus<string[]> => {
    if (store.size === 0) {
      return {
        error: true,
        message: 'Store is empty',
      };
    }

    const ids = getStore.toArray()?.data?.map((item) => item?.value?.id) || [];

    store.clear();

    return {
      success: true,
      data: ids,
    };
  };

  // #region Utils
  getStore.generateId = (item: SignalStoreItem): SignalStoreStatus<string> => {
    if (!item) {
      return {
        error: true,
        message: 'Invalid store item',
      };
    }

    return {
      success: true,
      data: store.size.toString(),
    };
  };

  getStore.toArray = (): SignalStoreStatus<SignalStoreItem[] & any[]> => {
    if (store.size === 0) {
      return {
        success: true,
        data: [],
      };
    }

    return {
      success: true,
      data: [...store].map(([_, value]) => ({ ...value })),
    };
  };
  // #endregion

  return getStore;
};
