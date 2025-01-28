using backend.Models;
using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace backend.Services;

public class UserTaskService
{
    private readonly AppDbContext _context;

    public UserTaskService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<UserTask>> GetUserTasks()
    {

        try
        {
            return await _context.UserTasks.ToListAsync();

        }
        catch (Exception ex)
        {
            throw new Exception("Error retrieving user tasks", ex);
        }

    }

    public async Task<UserTask?> GetUserTaskById(int id)
    {

        try
        {
            return await _context.UserTasks.FindAsync(id);

        }
        catch (DbUpdateException ex)
        {

            throw new ApplicationException("Error retrieving user task", ex);
        }

    }

    // public async Task<UserTask> CreateUserTask(UserTask userTask)
    // {
    //     _context.UserTasks.Add(userTask);
    //     await _context.SaveChangesAsync();
    //     return userTask;
    // }
    public async Task<UserTask> CreateUserTask(UserTask userTask)
    {
        if (userTask == null)
        {
            throw new ArgumentNullException(nameof(userTask));
        }

        // Verify if user exists

        var userExists = await _context.Users.AnyAsync(u => u.Id == userTask.UserId); // returns true or false
        if (!userExists)
        {
            throw new KeyNotFoundException($"User with ID {userTask.UserId} not found.");
        }

        try
        {
            _context.UserTasks.Add(userTask);
            await _context.SaveChangesAsync();
            return userTask;
        }
        catch (DbUpdateException ex)
        {
            throw new ApplicationException("Error creating user task", ex);
        }
    }

    public async Task UpdateUserTask(UserTask userTask)
    {
        if (userTask == null)
        {
            throw new ArgumentNullException(nameof(userTask));
        }

        try
        {
            _context.UserTasks.Update(userTask);
            await _context.SaveChangesAsync();

        }
        catch (DbUpdateException ex)
        {
            throw new ApplicationException("Error updating user task", ex);
        }

    }

    public async Task DeleteUserTask(int id)
    {
        var userTask = await _context.UserTasks.FindAsync(id);

        if (userTask == null)
        {
            throw new KeyNotFoundException($"User task with ID {id} not found.");
        }

        try
        {
            _context.UserTasks.Remove(userTask);
            await _context.SaveChangesAsync();

        }
        catch (DbUpdateException ex)
        {

            throw new ApplicationException("Error deleting user task", ex);
        }
    }
}