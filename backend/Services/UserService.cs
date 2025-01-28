using backend.Models;
using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace backend.Services;

public class UserService
{
    private readonly AppDbContext _context;

    public UserService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<User>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }

    // Additional methods you might want to add
    public async Task<User?> GetUserById(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<User> CreateUser(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task UpdateUser(User user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user != null)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }

    // The issue is that Entity Framework isn't loading 
    // the related UserTasks because of lazy loading. When
    //  you use FindAsync, it only loads the User entity but
    //  not its related tasks. You need to explicitly include 
    // the UserTasks using Include().

    public async Task<List<UserTask>> GetUserTaskByUserId(int userId)
    {

        var user = await _context.Users.Include(u => u.UserTasks)
        .FirstOrDefaultAsync(u => u.Id == userId);

        return user?.UserTasks.ToList() ?? new List<UserTask>();

    }
}