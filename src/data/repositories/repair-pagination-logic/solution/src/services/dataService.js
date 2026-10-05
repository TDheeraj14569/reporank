const data = Array.from({ length: 105 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

class DataService {
  getItems(page, limit) {
    // Correct offset calculation
    const offset = (page - 1) * limit;
    
    const paginatedItems = data.slice(offset, offset + limit);
    return {
      data: paginatedItems,
      total: data.length,
      page,
      limit,
      totalPages: Math.ceil(data.length / limit)
    };
  }
}

module.exports = new DataService();
