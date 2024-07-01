package com.controller;

import com.model.Condition;
import com.model.DurationPreset;
import com.model.ItemCategory;
import com.service.ConditionDAO;
import com.service.DurationPresetDAO;
import com.service.ItemCategoryDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/EditDropdownServlet")
public class EditDropdownServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");

        switch (action) {
            case "editCategory":
            case "deleteCategory":
            case "createCategory":
                request.setAttribute("categories", getCategories());
                request.getRequestDispatcher("/pages/editcategories.jsp").forward(request, response);
                break;
            case "editDuration":
            case "deleteDuration":
            case "createDuration":
                request.setAttribute("durations", getDurations());
                request.getRequestDispatcher("/pages/editdurations.jsp").forward(request, response);
                break;
            case "editCondition":
            case "deleteCondition":
            case "createCondition":
                request.setAttribute("conditions", getConditions());
                request.getRequestDispatcher("/pages/editconditions.jsp").forward(request, response);
                break;
            default:
                throw new ServletException("Invalid action");
        }
    }

    private List<ItemCategory> getCategories() throws ServletException {
        try {
            ItemCategoryDAO dao = new ItemCategoryDAO();
            return dao.getAllCategories();
        } catch (ClassNotFoundException e) {
            throw new ServletException(e);
        }
    }

    private List<DurationPreset> getDurations() throws ServletException {
        try {
            DurationPresetDAO dao = new DurationPresetDAO();
            return dao.getAllDurations();
        } catch (ClassNotFoundException e) {
            throw new ServletException(e);
        }
    }

    private List<Condition> getConditions() throws ServletException {
        try {
            ConditionDAO dao = new ConditionDAO();
            return dao.getAllConditions();
        } catch (ClassNotFoundException e) {
            throw new ServletException(e);
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");

        try {
            switch (action) {
                case "editCategory":
                    editCategory(request, response);
                    break;
                case "deleteCategory":
                    deleteCategory(request, response);
                    break;
                case "createCategory":
                    createCategory(request, response);
                    break;
                case "editDuration":
                    editDuration(request, response);
                    break;
                case "deleteDuration":
                    deleteDuration(request, response);
                    break;
                case "createDuration":
                    createDuration(request, response);
                    break;
                case "editCondition":
                    editCondition(request, response);
                    break;
                case "deleteCondition":
                    deleteCondition(request, response);
                    break;
                case "createCondition":
                    createCondition(request, response);
                    break;
                default:
                    throw new ServletException("Invalid action");
            }
        } catch (Exception e) {
            throw new ServletException(e);
        }
    }

    private void editCategory(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, IOException {
        int categoryNo = Integer.parseInt(request.getParameter("categoryNo"));
        String catName = request.getParameter("catName");
        boolean isActive = Boolean.parseBoolean(request.getParameter("isActive"));

        ItemCategory category = new ItemCategory(categoryNo, catName, isActive);
        ItemCategoryDAO dao = new ItemCategoryDAO();
        dao.updateCategory(category);

        response.sendRedirect(request.getContextPath() + "/EditDropdownServlet?action=editCategory");
    }

    private void deleteCategory(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, IOException {
        int categoryNo = Integer.parseInt(request.getParameter("categoryNo"));

        ItemCategoryDAO dao = new ItemCategoryDAO();
        dao.deleteCategory(categoryNo);

        response.sendRedirect(request.getContextPath() + "/EditDropdownServlet?action=editCategory");
    }

    private void createCategory(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, IOException {
        String catName = request.getParameter("catName");
        boolean isActive = Boolean.parseBoolean(request.getParameter("isActive"));

        ItemCategory category = new ItemCategory();
        category.setCatName(catName);
        category.setActive(isActive);

        ItemCategoryDAO dao = new ItemCategoryDAO();
        dao.addCategory(category);

        response.sendRedirect(request.getContextPath() + "/EditDropdownServlet?action=editCategory");
    }

    private void editDuration(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, IOException {
        int durationID = Integer.parseInt(request.getParameter("durationID"));
        String name = request.getParameter("name");
        int hours = Integer.parseInt(request.getParameter("hours"));
        boolean isActive = Boolean.parseBoolean(request.getParameter("isActive"));

        DurationPreset duration = new DurationPreset(durationID, name, hours, isActive);
        DurationPresetDAO dao = new DurationPresetDAO();
        dao.updateDuration(duration);

        response.sendRedirect(request.getContextPath() + "/EditDropdownServlet?action=editDuration");
    }

    private void deleteDuration(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, IOException {
        int durationID = Integer.parseInt(request.getParameter("durationID"));

        DurationPresetDAO dao = new DurationPresetDAO();
        dao.deleteDuration(durationID);

        response.sendRedirect(request.getContextPath() + "/EditDropdownServlet?action=editDuration");
    }

    private void createDuration(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, IOException {
        String name = request.getParameter("name");
        int hours = Integer.parseInt(request.getParameter("hours"));
        boolean isActive = Boolean.parseBoolean(request.getParameter("isActive"));

        DurationPreset duration = new DurationPreset();
        duration.setName(name);
        duration.setHours(hours);
        duration.setActive(isActive);

        DurationPresetDAO dao = new DurationPresetDAO();
        dao.addDuration(duration);

        response.sendRedirect(request.getContextPath() + "/EditDropdownServlet?action=editDuration");
    }

    private void editCondition(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, IOException {
        int conditionID = Integer.parseInt(request.getParameter("conditionID"));
        String name = request.getParameter("name");
        boolean isActive = Boolean.parseBoolean(request.getParameter("isActive"));

        Condition condition = new Condition(conditionID, name, isActive);
        ConditionDAO dao = new ConditionDAO();
        dao.updateCondition(condition);

        response.sendRedirect(request.getContextPath() + "/EditDropdownServlet?action=editCondition");
    }

    private void deleteCondition(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, IOException {
        int conditionID = Integer.parseInt(request.getParameter("conditionID"));

        ConditionDAO dao = new ConditionDAO();
        dao.deleteCondition(conditionID);

        response.sendRedirect(request.getContextPath() + "/EditDropdownServlet?action=editCondition");
    }

    private void createCondition(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, IOException {
        String name = request.getParameter("name");
        boolean isActive = Boolean.parseBoolean(request.getParameter("isActive"));

        Condition condition = new Condition();
        condition.setName(name);
        condition.setIsActive(isActive);

        ConditionDAO dao = new ConditionDAO();
        dao.addCondition(condition);

        response.sendRedirect(request.getContextPath() + "/EditDropdownServlet?action=editCondition");
    }
}
