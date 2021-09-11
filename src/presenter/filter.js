import FilterView from '../view/filter';
import {render, RenderPosition, replace, remove} from '../utils/render';
import {FilterType, UpdateType} from '../const';

class Filter {
  constructor(filterContainer, filterModel, eventModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._eventModel = eventModel;

    this._filterComponent = null;

    this._handleModelUpdateType = this._handleModelUpdateType.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._eventModel.addObserver(this._handleModelUpdateType);
    this._filterModel.addObserver(this._handleModelUpdateType);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelUpdateType() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  filtersDisabled() {
    if(this._filterComponent === null) {
      return;
    }
    const filterInputs = this._filterComponent.getElement().querySelectorAll('.trip-filters__filter-input');
    filterInputs.forEach((filter) => filter.setAttribute('disabled', 'disabled'));
  }

  filtersEnabled() {
    if(this._filterComponent === null) {
      return;
    }
    const filterInputs = this._filterComponent.getElement().querySelectorAll('.trip-filters__filter-input');
    filterInputs.forEach((filter) => filter.removeAttribute('disabled'));
  }

  _getFilters() {
    return [
      {
        type: FilterType.EVERYTHING,
        name: 'Everything',
      },
      {
        type: FilterType.FUTURE,
        name: 'Future',
      },
      {
        type: FilterType.PAST,
        name: 'Past',

      },
    ];
  }
}

export default Filter;
