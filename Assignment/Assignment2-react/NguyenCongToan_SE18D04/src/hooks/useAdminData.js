import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { accountAPI, categoryAPI, newsAPI, tagAPI } from "../services/api";

export function useAdminData(user, isAdmin, activeTab) {
  const [data, setData] = useState({
    systemAccounts: [],
    categories: [],
    newsArticles: [],
    tags: [],
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const [accounts, categories, news, tags] = await Promise.all([
        isAdmin ? accountAPI.getAll(token).catch(() => []) : Promise.resolve([]),
        categoryAPI.getAll(token).catch(() => []),
        newsAPI.getAll(token).catch(() => []),
        tagAPI.getAll(token).catch(() => []),
      ]);
      setData({
        systemAccounts: accounts || [],
        categories: categories || [],
        newsArticles: news || [],
        tags: tags || [],
      });
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Không thể tải dữ liệu: " + (error.message || "Lỗi không xác định"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadData();
  }, [user, isAdmin]);

  useEffect(() => {
    const searchWithAPI = async () => {
      if (!searchTerm.trim()) {
        setSearchResults(null);
        return;
      }
      try {
        const token = localStorage.getItem("token");
        let results = [];
        switch (activeTab) {
          case "users":
            if (isAdmin) {
              results = await accountAPI.search(searchTerm, token);
              setSearchResults({ systemAccounts: results });
            }
            break;
          case "category":
            results = await categoryAPI.search(searchTerm, token);
            setSearchResults({ categories: results });
            break;
          case "news":
            results = await newsAPI.search(searchTerm, token);
            setSearchResults({ newsArticles: results });
            break;
          case "tags":
            results = await tagAPI.search(searchTerm, token);
            setSearchResults({ tags: results });
            break;
          default:
            setSearchResults(null);
        }
      } catch (error) {
        console.error("Search error:", error);
        toast.error("Lỗi tìm kiếm: " + error.message);
        setSearchResults(null);
      }
    };
    const timeoutId = setTimeout(searchWithAPI, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, activeTab, isAdmin]);

  const getCategoryName = (categoryID) => {
    const category = data.categories.find((cat) => cat.categoryID === categoryID);
    return category ? category.categoryName : "Unknown";
  };

  const getAccountName = (accountID) => {
    const account = data.systemAccounts.find((acc) => acc.accountID === accountID);
    return account ? account.accountName : "Unknown";
  };

  const getNewsTags = (article) => {
    if (!article.tagIDs || article.tagIDs.length === 0) return "";
    const tagNames = article.tagIDs
      .map((tagID) => {
        const tag = data.tags.find((t) => t.tagID === tagID);
        return tag ? tag.tagName : "";
      })
      .filter((name) => name !== "");
    return tagNames.join(", ");
  };

  const filterData = (items, searchFields) => {
    if (!searchTerm) return items;
    const term = searchTerm.toLowerCase();
    return items.filter((item) =>
      searchFields.some((field) => String(item[field] || "").toLowerCase().includes(term))
    );
  };

  const getFilteredData = () => {
    if (searchResults) {
      switch (activeTab) {
        case "users": return searchResults.systemAccounts || [];
        case "category": return searchResults.categories || [];
        case "news": return searchResults.newsArticles || [];
        case "tags": return searchResults.tags || [];
        default: return [];
      }
    }
    if (!searchTerm) {
      switch (activeTab) {
        case "users": return data.systemAccounts;
        case "category": return data.categories;
        case "news": return data.newsArticles;
        case "tags": return data.tags;
        default: return [];
      }
    }
    switch (activeTab) {
      case "users": return filterData(data.systemAccounts, ["accountName", "accountEmail"]);
      case "category": return filterData(data.categories, ["categoryName", "categoryDescription"]);
      case "news": return filterData(data.newsArticles, ["newsTitle", "headline", "newsContent"]);
      case "tags": return filterData(data.tags, ["tagName", "note"]);
      default: return [];
    }
  };

  return {
    data,
    loading,
    loadData,
    searchTerm,
    setSearchTerm,
    getCategoryName,
    getAccountName,
    getNewsTags,
    filterData,
    getFilteredData,
  };
}
